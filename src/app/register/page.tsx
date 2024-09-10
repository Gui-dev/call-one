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

const Register = () => {
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
      >
        <label className="flex flex-col gap-2">
          <Text>Nome de usuário</Text>
          {/* @ts-expect-error: ERROR */}
          <TextInput prefix="call.one/" placeholder="seu-usuário" />
        </label>
        <label className="flex flex-col gap-2">
          <Text>Nome completo</Text>
          {/* @ts-expect-error: ERROR */}
          <TextInput placeholder="Seu nome completo" />
        </label>

        <Button>
          Próximo passo
          <ArrowRight />
        </Button>
      </Box>
    </div>
  )
}

export default Register
