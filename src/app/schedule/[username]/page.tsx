'use client'

import UserHeader from './components/user-header'
import { CalendarStep } from './components/calendar-step'
import { useState } from 'react'
import { ConfirmStep } from './components/confirm-step'
import { NextSeo } from 'next-seo'
import { useSession } from 'next-auth/react'

const Schedule = () => {
  const { data } = useSession()
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  const handleClearSelectedDateTime = () => {
    setSelectedDateTime(null)
  }

  return (
    <>
      <NextSeo title={`Schedule with ${data?.user.name} | Call One`} />
      <div className="max-w-[852px] py-4 mt-20 mx-auto mb-4">
        <UserHeader />

        {selectedDateTime && (
          <ConfirmStep
            schedulingDate={selectedDateTime}
            onBackToCalendarPage={handleClearSelectedDateTime}
          />
        )}

        {!selectedDateTime && (
          <CalendarStep onSelectDateTime={setSelectedDateTime} />
        )}
      </div>
    </>
  )
}

export default Schedule
