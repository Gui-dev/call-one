'use client'

import './../lib/dayjs'

import { useState } from 'react'
import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getWeekDays } from '../utils/get-week-days'
import { ButtonDay } from '../schedule/[username]/components/button-day'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })
  const shortWeekDays = getWeekDays({ short: true })
  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

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
          <tr className="p-4">
            <td className="box-border">
              <ButtonDay disabled></ButtonDay>
            </td>
            <td className="box-border">
              <ButtonDay disabled></ButtonDay>
            </td>
            <td className="box-border">
              <ButtonDay disabled></ButtonDay>
            </td>
            <td className="box-border">
              <ButtonDay disabled></ButtonDay>
            </td>
            <td className="box-border">
              <ButtonDay>1</ButtonDay>
            </td>
            <td className="box-border">
              <ButtonDay>2</ButtonDay>
            </td>
            <td className="box-border">
              <ButtonDay>3</ButtonDay>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Calendar
