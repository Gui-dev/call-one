'use client'

import { Box, Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight } from 'lucide-react'

const ConectCalendar = () => {
  // const handleRegister = async () => {}

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
          <Button variant="secondary" type="submit">
            Conectar
            <ArrowRight />
          </Button>
        </Box>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </Box>
    </div>
  )
}

export default ConectCalendar
