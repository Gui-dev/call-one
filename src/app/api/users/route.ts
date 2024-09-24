import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/app/lib/prisma'

export const POST = async (request: NextRequest) => {
  const { id, name, username } = await request.json()

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
      name,
      username,
    },
  })

  return NextResponse.json(user, {
    status: 201,
  })
}
