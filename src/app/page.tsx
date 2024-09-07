'use client'

import { Heading, Text } from '@ignite-ui/react'

import previewImage from './assets/app-preview.png'
import Image from 'next/image'
import { ClaimUsernameForm } from './components/claim-username-form'

export default function Home() {
  return (
    <div className="flex items-center gap-20 h-screen max-w-[calc(100vw-(100vw-1160px)/2)] ml-auto">
      <div className="max-w-[400px] py-0 px-10">
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendario e permita que as pessoas marquem agendamentos
          no seu temppo livre
        </Text>
        <ClaimUsernameForm />
      </div>
      <div className="pr-8 overflow-hidden hidden sm:flex md:flex lg:flex">
        <Image
          src={previewImage}
          alt="Calendar image"
          height={400}
          quality={100}
          priority
        />
      </div>
    </div>
  )
}
