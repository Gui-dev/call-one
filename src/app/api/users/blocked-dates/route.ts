import { prisma } from '@/app/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
// import dayjs from 'dayjs'

export const GET = async (request: NextRequest) => {
  const session = await getServerSession(authOptions)
  const month = request.nextUrl.searchParams.get('month')
  const year = request.nextUrl.searchParams.get('year')

  if (!session) {
    return NextResponse.redirect('/register/connect-calendar', { status: 401 })
  }

  if (!month || !year) {
    return NextResponse.redirect(`/schedule/${session.user.username}`, {
      status: 400,
      statusText: 'Year or month not specified',
    })
  }

  const user_id = session.user.id

  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  })

  if (!user) {
    return NextResponse.redirect('/register/connect-calendar', { status: 401 })
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    where: {
      user_id: user.id,
    },
    select: {
      week_day: true,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay,
    )
  })

  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT
      EXTRACT(DAY FROM S.date) AS date,
      COUNT(S.date) AS amount,
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size

    FROM schedulings S

    LEFT JOIN user_time_intervals UTI
      ON UTI.week_day = EXTRACT(DOW FROM S.date + INTERVAL '1 day')

    WHERE S.user_id = ${user.id}
      AND to_char(S.date, 'YYYY-MM') = ${`${year}-${month}`}

    GROUP BY EXTRACT(DAY FROM S.date),
      UTI.time_end_in_minutes,
      UTI.time_start_in_minutes,
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

    HAVING
      COUNT(S.date) >= (UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60.0
  `

  const blockedDates = blockedDatesRaw.map((item) => item.date)

  return NextResponse.json({ blockedWeekDays, blockedDates }, { status: 201 })
}
