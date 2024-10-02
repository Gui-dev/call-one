import { prisma } from '@/app/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export const PUT = async (request: NextRequest) => {
  const session = await getServerSession(authOptions)
  const { bio } = updateProfileBodySchema.parse(await request.json())

  if (!session) {
    return NextResponse.redirect('/register/connect-calendar', { status: 401 })
  }
  const user_id = session.user.id

  await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      bio,
    },
  })

  return NextResponse.json({}, { status: 201 })
}
