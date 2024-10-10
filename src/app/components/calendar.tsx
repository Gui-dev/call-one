'use client'

import './../lib/dayjs'

import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getWeekDays } from '../utils/get-week-days'
import { ButtonDay } from '../schedule/[username]/components/button-day'

interface ICalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = ICalendarWeek[]

interface ICalendarProps {
  selectedDate: Date | null
  onSelectedDate: (date: Date) => void
}

const Calendar = ({ selectedDate, onSelectedDate }: ICalendarProps) => {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  const shortWeekDays = getWeekDays({ short: true })
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')
  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')
    const previousMonthFillArray = Array.from({ length: firstWeekDay })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')
    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return { date, disabled: date.endOf('day').isBefore(new Date()) }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate])

  const handlePreviousMonth = () => {
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  const handleNextMonth = () => {
    const previousMonthDate = currentDate.add(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  return (
    <div className="flex flex-col gap-6 p-6 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-medium capitalize">
          {currentMonth}{' '}
          <span className="text-gray-200 text-sm">{currentYear}</span>
        </h2>
        <div className="flex gap-2 text-gray-200">
          <button
            className="leading-none hover:text-gray-300"
            onClick={handlePreviousMonth}
            title="Mês anterior"
          >
            <ChevronLeft height={20} width={20} />
          </button>
          <button
            className="leading-none hover:text-gray-300"
            onClick={handleNextMonth}
            title="Próximo mês"
          >
            <ChevronRight height={20} width={20} />
          </button>
        </div>
      </div>

      <table className="w-full table-fixed border-spacing-2 border-separate p-2">
        <thead>
          <tr>
            {shortWeekDays.map((day) => {
              return (
                <th key={day} className="text-gray-200 font-medium text-sm">
                  {day}.
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="before:block before:text-gray-800 before:leading-[0.75rem]">
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week} className="p-4">
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()} className="box-border">
                      <ButtonDay
                        disabled={disabled}
                        onClick={() => onSelectedDate(date.toDate())}
                      >
                        {date.get('date')}
                      </ButtonDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Calendar
