interface IGetWeekDaysParams {
  short?: boolean
}

export const getWeekDays = ({ short = false }: IGetWeekDaysParams = {}) => {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3).toLocaleUpperCase()
      }

      return weekDay
        .substring(0, 1)
        .toLocaleUpperCase()
        .concat(weekDay.substring(1))
    })
}
