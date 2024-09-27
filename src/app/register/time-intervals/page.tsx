'use client'

import { ArrowRight } from 'lucide-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Box,
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'

import {
  timeIntervalsValidation,
  TimeIntervalsValidationInputData,
  TimeIntervalsValidationOutputData,
} from '@/app/validations/time-intervals-validation'
import { getWeekDays } from '@/app/utils/get-week-days'

const TimeIntervals = () => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm<
    TimeIntervalsValidationInputData,
    unknown,
    TimeIntervalsValidationOutputData
  >({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
    resolver: zodResolver(timeIntervalsValidation),
  })
  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })
  const intervals = watch('intervals')
  const weekDays = getWeekDays()

  const handleSetTimeIntervals = (data: TimeIntervalsValidationOutputData) => {
    console.log('DATA: ', data)
  }

  return (
    <div className="mt-20 mx-auto mb-4 px-4 max-w-[572px] flex flex-col gap-4">
      <div className="px-6">
        <Heading css={{ color: '$white', lineHeight: '$base' }}>
          Quase lá
        </Heading>
        <Text css={{ color: '$gray400', lineHeight: '$base' }}>
          Defina os intervalos de horários que você está dísponivel em cada dia
          da semana
        </Text>
        <MultiStep size={3} currentStep={2} />
      </div>

      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 16,
        }}
        as="form"
        onSubmit={handleSubmit(handleSetTimeIntervals)}
      >
        <div className="border border-gray-600 rounded-md mb-4 gap-3">
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="flex items-center justify-between px-3 py-4 border-b border-gray-600 last:border-none"
              >
                <div className="flex items-center gap-3">
                  <Controller
                    control={control}
                    name={`intervals.${index}.enabled`}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          // @ts-expect-error: Type error
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                          checked={field.value}
                        />
                      )
                    }}
                  />
                  <Text>{weekDays[field.weekDay]}</Text>
                </div>
                <div className="flex items-center gap-2">
                  {/* @ts-expect-error: ERROR */}
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={intervals[index].enabled === false}
                    css={{
                      'input::-webkit-calendar-picker-indicator': {
                        filter: 'interval(100%) brightness(30%)',
                      },
                    }}
                    {...register(`intervals.${index}.startTime`)}
                  />
                  {/* @ts-expect-error: ERROR */}
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${index}.endTime`)}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {errors.intervals && (
          <span className="mb-4 text-red-500 text-sm">
            {errors.intervals?.root?.message}
          </span>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Box>
    </div>
  )
}

export default TimeIntervals
