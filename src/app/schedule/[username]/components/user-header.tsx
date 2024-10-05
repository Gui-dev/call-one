import Image from 'next/image'
import React from 'react'

import { prisma } from '@/app/lib/prisma'

interface IUserHeaderParams {
  username: string
}

const UserHeader = async ({ username }: IUserHeaderParams) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Image
        src={String(user.avatar_url)}
        alt="Gui Silva"
        height={60}
        width={60}
        className="rounded-full"
      />
      <h1 className="text-gray-100 text-lg font-bold">{user.name}</h1>
      <h2 className="text-gray-300 text-xs">Software Engineer</h2>
    </div>
  )
}

export default UserHeader
