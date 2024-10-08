import UserHeader from './components/user-header'
import { CalendarStep } from './components/calendar-step'
// import { ConfirmStep } from './components/confirm-step'

interface IScheduleParams {
  params: {
    username: string
  }
}

const Schedule = async ({ params }: IScheduleParams) => {
  return (
    <div className="max-w-[852px] py-4 mt-20 mx-auto mb-4">
      <UserHeader username={params.username} />

      <CalendarStep />
      {/* <ConfirmStep /> */}
    </div>
  )
}

export default Schedule
