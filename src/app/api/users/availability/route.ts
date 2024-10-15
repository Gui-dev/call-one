import { prisma } from '@/app/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import dayjs from 'dayjs'

export const GET = async (request: NextRequest) => {
  const session = await getServerSession(authOptions)
  const date = request.nextUrl.searchParams.get('date')

  if (!session) {
    return NextResponse.redirect('/register/time-intervals', { status: 401 })
  }
  const user_id = session.user.id

  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  })

  if (!user) {
    return NextResponse.redirect('/register/time-intervals', { status: 404 })
  }

  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return NextResponse.json(
      { possibleTimes: [], availableTimes: [] },
      { status: 201 },
    )
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return NextResponse.json(
      { possibleTimes: [], availableTimes: [] },
      { status: 201 },
    )
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability
  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i
    },
  )

  const blockedTimes = await prisma.scheduling.findMany({
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
    select: {
      date: true,
    },
  })

  const availableTimes = possibleTimes.filter((time) => {
    return !blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time,
    )
  })

  return NextResponse.json({ possibleTimes, availableTimes }, { status: 201 })
}
