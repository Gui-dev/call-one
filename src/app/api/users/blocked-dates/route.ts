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

  const blockedDatesRaw = await prisma.$queryRaw`
    SELECT *
    FROM schedulings S
    WHERE S.user_id = ${user.id}
    AND to_char(S.date, 'YYYY-MM') = ${`${year}-${month}`}
  `

  return NextResponse.json(
    { blockedWeekDays, blockedDatesRaw },
    { status: 201 },
  )
}
