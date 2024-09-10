'use client'

import { ArrowRight } from 'lucide-react'
import { Box, Button, Text, TextInput } from '@ignite-ui/react'
import { useForm } from 'react-hook-form'
import {
  claimUsernameValidation,
  ClaimUsernameValidationData,
} from '../validations/claim-username-validation'
import { zodResolver } from '@hookform/resolvers/zod'

export const ClaimUsernameForm: React.FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ClaimUsernameValidationData>({
    resolver: zodResolver(claimUsernameValidation),
  })

  const handleClaimUsername = ({ username }: ClaimUsernameValidationData) => {
    console.log(username)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleClaimUsername)}>
        <Box className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 p-4">
          {/* @ts-expect-error: ERROR */}
          <TextInput
            size="sm"
            prefix="call.one/"
            placeholder="seu-usuário"
            {...register('username')}
          />
          <Button size="sm" type="submit">
            Reservar
            <ArrowRight />
          </Button>
        </Box>
      </form>
      <div className="mt-2">
        <Text size="sm">{errors.username?.message}</Text>
      </div>
    </>
  )
}
