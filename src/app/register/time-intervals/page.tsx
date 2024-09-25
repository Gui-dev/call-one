'use client'

import {
  Box,
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { ArrowRight } from 'lucide-react'

const TimeIntervals = () => {
  return (
    <div className="mt-20 mx-auto mb-4 px-4 max-w-[572px] flex flex-col gap-4">
      <div className="px-6">
        <Heading css={{ color: '$white', lineHeight: '$base' }}>
          Quase lá
        </Heading>
        <Text css={{ color: '$gray400', lineHeight: '$base' }}>
          Defina os intervalos de horários que você está dísponivel em cada dia
          da semana
        </Text>
        <MultiStep size={3} currentStep={2} />
      </div>

      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 16,
        }}
        as="form"
      >
        <div className="border border-gray-600 rounded-md mb-4 gap-3">
          <div className="flex items-center justify-between px-3 py-4 border-b border-gray-600">
            <div className="flex items-center gap-3">
              <Checkbox />
              <Text>Segunda-feira</Text>
            </div>
            <div className="flex items-center gap-2">
              {/* @ts-expect-error: ERROR */}
              <TextInput
                size="sm"
                type="time"
                step={60}
                css={{
                  'input::-webkit-calendar-picker-indicator': {
                    filter: 'interval(100%) brightness(30%)',
                  },
                }}
              />
              {/* @ts-expect-error: ERROR */}
              <TextInput size="sm" type="time" step={60} />
            </div>
          </div>

          <div className="flex items-center justify-between px-3 py-4 border-b border-gray-600 last:border-none">
            <div className="flex items-center gap-3">
              <Checkbox />
              <Text>Terça-feira</Text>
            </div>
            <div className="flex items-center gap-2">
              {/* @ts-expect-error: ERROR */}
              <TextInput size="sm" type="time" step={60} />
              {/* @ts-expect-error: ERROR */}
              <TextInput size="sm" type="time" step={60} />
            </div>
          </div>
        </div>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </Box>
    </div>
  )
}

export default TimeIntervals
