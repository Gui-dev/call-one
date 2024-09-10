import { z } from 'zod'

export const claimUsernameValidation = z.object({
  username: z
    .string()
    .min(3, { message: 'No minimo 3 letras' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Só letras e hiffen' })
    .transform((username) => username.toLocaleLowerCase()),
})

export type ClaimUsernameValidationData = z.infer<
  typeof claimUsernameValidation
>
