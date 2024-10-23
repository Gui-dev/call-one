'use client'

import { api } from '@/app/lib/api'
import {
  confirmStepValidation,
  ConfirmStepValidationData,
} from '@/app/validations/confirm-step-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, TextArea, TextInput } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { Calendar, Clock } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface IConfirmStepProps {
  schedulingDate: Date
  onBackToCalendarPage: () => void
}

export const ConfirmStep = ({
  schedulingDate,
  onBackToCalendarPage,
}: IConfirmStepProps) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ConfirmStepValidationData>({
    resolver: zodResolver(confirmStepValidation),
  })
  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedHour = dayjs(schedulingDate).format('HH:mm[h]')

  const handleConfirmSchedule = async ({
    name,
    email,
    observations,
  }: ConfirmStepValidationData) => {
    await api.post('/users/schedule', {
      name,
      email,
      observations,
      date: schedulingDate,
    })
    onBackToCalendarPage()
  }

  const handleCancelConfirmation = () => {
    onBackToCalendarPage()
  }

  return (
    <Box
      as="form"
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        margin: '$6 auto 0',
        'max-width': 540,
      }}
      onSubmit={handleSubmit(handleConfirmSchedule)}
    >
      <div className="flex items-center gap-4 pb-6 mb-2 border-b border-b-gray-600">
        <p className="flex items-center gap-2">
          <Calendar className="text-gray-200 h-5 w-5" />
          {describedDate}
        </p>
        <p className="flex items-center gap-2">
          <Clock className="text-gray-200 h-5 w-5" />
          {describedHour}
        </p>
      </div>

      <label className="flex flex-col gap-2">
        <span>Nome completo</span>
        {/* @ts-expect-error: ERROR */}
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name?.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span>Endereço de e-mail</span>
        {/* @ts-expect-error: ERROR */}
        <TextInput placeholder="Seu e-mail" {...register('email')} />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email?.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span>Observações</span>
        <TextArea {...register('observations')} />
      </label>

      <div className="flex items-center justify-end gap-4 mt-2">
        <Button variant="tertiary" onClick={handleCancelConfirmation}>
          Cancelar
        </Button>
        <Button disabled={isSubmitting}>Confirmar</Button>
      </div>
    </Box>
  )
}
