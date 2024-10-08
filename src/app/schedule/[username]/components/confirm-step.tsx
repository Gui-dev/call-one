'use client'

import {
  confirmStepValidation,
  ConfirmStepValidationData,
} from '@/app/validations/confirm-step-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, TextArea, TextInput } from '@ignite-ui/react'
import { Calendar, Clock } from 'lucide-react'
import { useForm } from 'react-hook-form'

export const ConfirmStep = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ConfirmStepValidationData>({
    resolver: zodResolver(confirmStepValidation),
  })

  const handleConfirmStep = async (data: ConfirmStepValidationData) => {
    console.log('DATA: ', data)
  }

  console.log('ERRORS: ', errors)

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
      onSubmit={handleSubmit(handleConfirmStep)}
    >
      <div className="flex items-center gap-4 pb-6 mb-2 border-b border-b-gray-600">
        <p className="flex items-center gap-2">
          <Calendar className="text-gray-200 h-5 w-5" />
          05 de Outubro de 2024
        </p>
        <p className="flex items-center gap-2">
          <Clock className="text-gray-200 h-5 w-5" />
          18:00h
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
        <Button variant="tertiary">Cancelar</Button>
        <Button disabled={isSubmitting}>Confirmar</Button>
      </div>
    </Box>
  )
}
