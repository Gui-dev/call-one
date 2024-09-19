'use client'

import { signIn, useSession } from 'next-auth/react'
import { Box, Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight, Check } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const ConectCalendar = () => {
  const query = useSearchParams()
  const { status } = useSession()
  const hasAuthError = !!query.get('error')
  const isSignedIn = status === 'authenticated'

  const handleGoogleSignIn = async () => {
    signIn('google')
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
        <MultiStep size={4} currentStep={2} />
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

        {hasAuthError && (
          <span className="text-red-400 mb-2 text-sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </span>
        )}

        <Button
          type="submit"
          disabled={status === 'unauthenticated' || hasAuthError}
        >
          Próximo passo
          <ArrowRight />
        </Button>
      </Box>
    </div>
  )
}

export default ConectCalendar
