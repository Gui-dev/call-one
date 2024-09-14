import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/app/lib/prisma'

export const POST = async (request: NextRequest) => {
  const { name, username } = await request.json()

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return NextResponse.json(
      { message: 'Username already taken.' },
      {
        status: 400,
      },
    )
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  return NextResponse.json(user, {
    status: 201,
    headers: {
      'Set-Cookie': `call.one:user_id=${user.id}; maxAge=60*60*24; path='/'`,
    },
  })
}
