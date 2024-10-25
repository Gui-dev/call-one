import { prisma } from '@/app/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import dayjs from 'dayjs'
import { google } from 'googleapis'
import { getGoogleOAuthToken } from '@/app/lib/google'

const createSchedulingBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  observations: z.string().nullable(),
  date: z.string().datetime(),
})

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.redirect('/register/connect-calendar', { status: 401 })
  }

  const user_id = session.user.id

  const { name, email, observations, date } = createSchedulingBodySchema.parse(
    await request.json(),
  )
  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return NextResponse.json(
      { message: 'Date is in the past' },
      { status: 400 },
    )
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return NextResponse.json(
      { message: 'There is another scheduling at the same time' },
      { status: 400 },
    )
  }

  const scheduling = await prisma.scheduling.create({
    data: {
      user_id,
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
    },
  })

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user_id),
  })

  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Call.one ${name}`,
      description: observations,
      start: {
        dateTime: schedulingDate.format(),
      },
      end: {
        dateTime: schedulingDate.add(1, 'hour').format(),
      },
      attendees: [{ email, displayName: name }],
      conferenceData: {
        createRequest: {
          requestId: scheduling.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    },
  })

  return NextResponse.json({}, { status: 201 })
}
