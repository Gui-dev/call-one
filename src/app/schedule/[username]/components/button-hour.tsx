import { ComponentPropsWithoutRef } from 'react'

interface IButtonHourProps extends ComponentPropsWithoutRef<'button'> {}

export const ButtonHour = (props: IButtonHourProps) => {
  return (
    <button
      className="bg-gray-600 text-gray-100 rounded-sm text-sm py-2 leading-3 last:mb-4 enabled:hover:bg-gray-500 focus:shadow-md disabled:bg-none disabled:cursor-default disabled:opacity-40"
      {...props}
    >
      {props.children}
    </button>
  )
}
