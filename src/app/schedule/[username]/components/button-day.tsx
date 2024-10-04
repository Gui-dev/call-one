import { ComponentPropsWithoutRef } from 'react'

interface IButtonDayProps extends ComponentPropsWithoutRef<'button'> {}

export const ButtonDay = (props: IButtonDayProps) => {
  return (
    <button
      className="w-full aspect-square bg-gray-700 text-center rounded-sm enabled:hover:bg-gray-600 focus:shadow-sm disabled:bg-none disabled:cursor-default disabled:opacity-40"
      {...props}
    >
      {props.children}
    </button>
  )
}
