'use client'

import { signIn, useSession } from 'next-auth/react'
import {
  Box,
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { ArrowRight, Check } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import {
  registerValidation,
  RegisterValidationData,
} from '@/app/validations/register-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/app/lib/api'
import { AxiosError } from 'axios'

const ConectCalendar = () => {
  const query = useSearchParams()
  const { status, data } = useSession()
  const hasAuthError = !!query.get('error')
  const isSignedIn = status === 'authenticated'
  const username = query.get('username')
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<RegisterValidationData>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      username: username ?? '',
      name: String(data?.user?.name) ?? '',
    },
  })

  const handleGoogleSignIn = async () => {
    await signIn('google')
  }

  const handleRegister = async ({ name, username }: RegisterValidationData) => {
    try {
      await api.post('/users', {
        id: data?.user?.id,
        username,
        name,
      })
      alert('Atualizado')
      // router.push(`/register/connect-calendar`)
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data.message) {
        alert(error.response.data.message)
        return
      }
      console.log(error)
    }
  }

  console.log('Data: ', data?.user.id)

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
        <MultiStep size={3} currentStep={2} />
      </div>

      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Box
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text>Google Agenda</Text>
          {!isSignedIn && (
            <Button
              variant="secondary"
              type="submit"
              onClick={handleGoogleSignIn}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}

          {isSignedIn && (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          )}
        </Box>

        {status === 'authenticated' && (
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col gap-4"
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
                    <span className="text-red-500">
                      {errors.username?.message}
                    </span>
                  </Text>
                </div>
              )}
            </label>
            <label className="flex flex-col gap-2">
              <Text>Nome completo</Text>
              {/* @ts-expect-error: ERROR */}
              <TextInput
                placeholder="Seu nome completo"
                {...register('name')}
              />
              {errors.name && (
                <div className="mt-1">
                  <Text size="sm">
                    <span className="text-red-500">{errors.name?.message}</span>
                  </Text>
                </div>
              )}
            </label>

            <Button
              type="submit"
              onClick={handleRegister}
              disabled={hasAuthError || isSubmitting}
            >
              Próximo passo
              <ArrowRight />
            </Button>
          </form>
        )}
        {hasAuthError && (
          <span className="text-red-400 mb-2 text-sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </span>
        )}
      </Box>
    </div>
  )
}

export default ConectCalendar
