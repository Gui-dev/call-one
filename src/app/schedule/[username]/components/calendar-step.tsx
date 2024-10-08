'use client'

import { Box } from '@ignite-ui/react'
import Calendar from '@/app/components/calendar'
import { ButtonHour } from './button-hour'
import { useState } from 'react'
import dayjs from 'dayjs'

export const CalendarStep = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  return (
    <Box
      css={{
        margin: '$6 auto 0',
        padding: 0,
        display: 'grid',
        position: 'relative',
        'max-width': '100%',
        width: isDateSelected ? '100%' : 540,
        gridTemplateColumns: isDateSelected ? '1fr 280px' : '1fr',
        '@media(max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      }}
    >
      <Calendar selectedDate={selectedDate} onSelectedDate={setSelectedDate} />

      {isDateSelected && (
        <div className="flex flex-col gap-2 p-6 border-l border-l-gray-600 overflow-y-scroll w-[280px] absolute right-0 top-0 bottom-0">
          <h2 className="text-white font-medium">
            {weekDay},{' '}
            <span className="text-gray-200 text-sm">{describedDate}</span>
          </h2>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 md:grid-cols-1">
            <ButtonHour disabled>08:00h</ButtonHour>
            <ButtonHour disabled>09:00h</ButtonHour>
            <ButtonHour disabled>10:00h</ButtonHour>
            <ButtonHour disabled>11:00h</ButtonHour>
            <ButtonHour>12:00h</ButtonHour>
            <ButtonHour>13:00h</ButtonHour>
            <ButtonHour>14:00h</ButtonHour>
            <ButtonHour>15:00h</ButtonHour>
            <ButtonHour>16:00h</ButtonHour>
            <ButtonHour>17:00h</ButtonHour>
            <ButtonHour>18:00h</ButtonHour>
          </div>
        </div>
      )}
    </Box>
  )
}
