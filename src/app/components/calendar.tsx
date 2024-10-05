import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getWeekDays } from '../utils/get-week-days'
import { ButtonDay } from '../schedule/[username]/components/button-day'

const Calendar = () => {
  const shortWeekDays = getWeekDays({ short: true })

  return (
    <div className="flex flex-col gap-6 p-6 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-medium">
          Outubro <span className="text-gray-200 text-sm">2024</span>
        </h2>
        <div className="flex gap-2 text-gray-200">
          <button className="leading-none hover:text-gray-300">
            <ChevronLeft height={20} width={20} />
          </button>
          <button className="leading-none hover:text-gray-300">
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
