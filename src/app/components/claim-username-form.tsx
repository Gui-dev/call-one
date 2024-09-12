'use client'

import { ArrowRight } from 'lucide-react'
import { Box, Button, Text, TextInput } from '@ignite-ui/react'
import { useForm } from 'react-hook-form'
import {
  claimUsernameValidation,
  ClaimUsernameValidationData,
} from '../validations/claim-username-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

export const ClaimUsernameForm: React.FC = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<ClaimUsernameValidationData>({
    resolver: zodResolver(claimUsernameValidation),
  })
  const router = useRouter()

  const handleClaimUsername = ({ username }: ClaimUsernameValidationData) => {
    router.push(`/register?username=${username}`)
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
          <Button size="sm" type="submit" disabled={isSubmitting}>
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
