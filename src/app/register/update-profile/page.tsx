'use client'

import { api } from '@/app/lib/api'
import {
  updateProfileValidation,
  UpdateProfileValidationData,
} from '@/app/validations/update-profile-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const UpdateProfile = () => {
  const router = useRouter()
  const { data, status } = useSession()
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<UpdateProfileValidationData>({
    resolver: zodResolver(updateProfileValidation),
  })

  const handleUpdateProfile = async ({ bio }: UpdateProfileValidationData) => {
    try {
      await api.put('/users/profile', { bio })
      router.push(`/schedule/${data?.user.username}`)
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

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
        <MultiStep size={3} currentStep={3} />
      </div>

      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginTop: 16,
        }}
        as="form"
        onSubmit={handleSubmit(handleUpdateProfile)}
      >
        <label className="flex flex-col gap-2">
          {status === 'loading' && (
            <div className="flex items-center justify-center h-[60px] w-[60px] rounded-full">
              <LoaderCircle className="animate-spin" />
            </div>
          )}

          {status === 'authenticated' && (
            <>
              <Text>Foto de perfil</Text>
              <Image
                src={String(data?.user.avatar_url)}
                alt={`Foto do perfil de ${data?.user.name}`}
                height={60}
                width={60}
                className="rounded-full"
              />
            </>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <Text>Sobre você</Text>
          <TextArea {...register('bio')} />
          <Text size="sm">
            Fale um pouco sobre você, Isto será exibido em sua página pessoal
          </Text>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </Box>
    </div>
  )
}

export default UpdateProfile
