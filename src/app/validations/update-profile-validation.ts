import { z } from 'zod'

export const updateProfileValidation = z.object({
  bio: z.string(),
})

export type UpdateProfileValidationData = z.infer<
  typeof updateProfileValidation
>
