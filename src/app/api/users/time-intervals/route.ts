import { prisma } from '@/app/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { TimeIntervalsValidationOutputData } from '@/app/validations/time-intervals-validation'

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions)
  const { intervals }: TimeIntervalsValidationOutputData = await request.json()

  if (!session) {
    return NextResponse.redirect('/register/time-intervals')
  }

  const user_id = session.user.id

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          user_id,
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
        },
      })
    }),
  )

  return NextResponse.json({}, { status: 201 })
}
