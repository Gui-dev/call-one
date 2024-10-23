'use client'

import Image from 'next/image'
import React from 'react'
import { useSession } from 'next-auth/react'

const UserHeader = () => {
  const { data } = useSession()

  if (!data?.user) {
    return <p>Carregando...</p>
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Image
        src={String(data?.user.avatar_url)}
        alt="Gui Silva"
        height={60}
        width={60}
        className="rounded-full"
      />
      <h1 className="text-gray-100 text-lg font-bold">{data?.user.name}</h1>
      <h2 className="text-gray-300 text-xs">Software Engineer</h2>
    </div>
  )
}

export default UserHeader
