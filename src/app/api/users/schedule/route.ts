import { prisma } from '@/app/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import dayjs from 'dayjs'

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

  await prisma.scheduling.create({
    data: {
      user_id,
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
    },
  })

  return NextResponse.json({}, { status: 201 })
}
