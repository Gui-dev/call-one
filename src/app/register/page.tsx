'use client'

import {
  Box,
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  registerValidation,
  RegisterValidationData,
} from '../validations/register-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { api } from '../lib/api'
import { AxiosError } from 'axios'

const Register = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = searchParams.get('username')
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterValidationData>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      username: username ?? '',
      name: '',
    },
  })

  const handleRegister = async ({ name, username }: RegisterValidationData) => {
    try {
      await api.post('/users', {
        username,
        name,
      })
      router.push('/register/conect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data.message) {
        alert(error.response.data.message)
        return
      }
      console.log(error)
    }
  }

  return (
    <div className="mt-20 mx-auto mb-4 px-4 max-w-[572px] flex flex-col gap-4">
      <div className="px-6">
        <Heading css={{ color: '$white', lineHeight: '$base' }}>
          Bem vindo ao Call.one
        </Heading>
        <Text css={{ color: '$gray400', lineHeight: '$base' }}>
          Previsamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois
        </Text>
        <MultiStep size={4} currentStep={1} />
      </div>
      <Box
        as="form"
        css={{
          marginTop: '$6',
          display: 'flex',
          flexDirection: 'column',
          gap: '$4',
        }}
        onSubmit={handleSubmit(handleRegister)}
      >
        <label className="flex flex-col gap-2">
          <Text>Nome de usuário</Text>
          {/* @ts-expect-error: ERROR */}
          <TextInput
            prefix="call.one/"
            placeholder="seu-usuário"
            {...register('username')}
          />
          {errors.username && (
            <div className="mt-1">
              <Text size="sm">
                <span className="text-red-500">{errors.username?.message}</span>
              </Text>
            </div>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <Text>Nome completo</Text>
          {/* @ts-expect-error: ERROR */}
          <TextInput placeholder="Seu nome completo" {...register('name')} />
          {errors.name && (
            <div className="mt-1">
              <Text size="sm">
                <span className="text-red-500">{errors.name?.message}</span>
              </Text>
            </div>
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Box>
    </div>
  )
}

export default Register
