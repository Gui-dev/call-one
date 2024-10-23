'use client'

import { Box } from '@ignite-ui/react'
import Calendar from '@/app/components/calendar'
import { ButtonHour } from './button-hour'
import { useState } from 'react'
import dayjs from 'dayjs'
import { api } from '@/app/lib/api'
import { useQuery } from '@tanstack/react-query'

interface IAvailability {
  possibleTimes: Array<number>
  availableTimes: Array<number>
}

interface ICalendarStepProps {
  onSelectDateTime: (date: Date) => void
}

export const CalendarStep = ({ onSelectDateTime }: ICalendarStepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDateSelected = !!selectedDate
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null
  const { data: availability } = useQuery<IAvailability>({
    queryKey: ['availability'],
    enabled: !!selectedDate,
    queryFn: async () => {
      const response = await api.get(`/users/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
  })

  const handleSelectDateTime = async (hour: number) => {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()
    onSelectDateTime(dateWithTime)
  }

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
            {availability?.possibleTimes.map((hour) => {
              return (
                <ButtonHour
                  key={String(hour)}
                  disabled={!availability.availableTimes.includes(hour)}
                  onClick={() => handleSelectDateTime(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </ButtonHour>
              )
            })}
          </div>
        </div>
      )}
    </Box>
  )
}
