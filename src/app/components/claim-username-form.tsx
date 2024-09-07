'use client'

import { ArrowRight } from 'lucide-react'
import { Box, Button, TextInput } from '@ignite-ui/react'

export const ClaimUsernameForm: React.FC = () => {
  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 p-4">
      {/* @ts-expect-error: ERROR */}
      <TextInput size="sm" prefix="call.one/" placeholder="seu-usuário" />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Box>
  )
}
