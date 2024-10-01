import { NextResponse } from 'next/server'

import { prisma } from '@/app/lib/prisma'
import { NextApiRequest } from 'next'

export const POST = async (request: NextApiRequest) => {
  const { id, username } = await request.body()

  const userExists = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (userExists?.username === username) {
    return NextResponse.json(
      { message: 'Username already taken.' },
      {
        status: 400,
      },
    )
  }

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      username,
    },
  })

  return NextResponse.json(user, {
    status: 201,
  })
}
