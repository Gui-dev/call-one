import { z } from 'zod'

export const confirmStepValidation = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa de no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})

export type ConfirmStepValidationData = z.infer<typeof confirmStepValidation>
