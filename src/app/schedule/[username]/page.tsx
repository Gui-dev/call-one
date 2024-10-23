'use client'

import UserHeader from './components/user-header'
import { CalendarStep } from './components/calendar-step'
import { useState } from 'react'
import { ConfirmStep } from './components/confirm-step'

const Schedule = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>()

  const handleClearSelectedDateTime = () => {
    setSelectedDateTime(null)
  }

  return (
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
  )
}

export default Schedule
