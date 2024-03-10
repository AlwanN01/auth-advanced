"use server"

import { db } from "@/lib/prisma"

import { getVerificationTokenByToken } from "@/services/token"
import { getUserByEmail } from "@/services/user"

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)
  if (!existingToken) return { error: "Token does not exist!" }

  const hasExpired = new Date() > new Date(existingToken.expires)
  if (hasExpired) return { error: "Token has expired!" }

  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) return { error: "Email does not exist!" }

  const updateEmailVerified = db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  })
  const deleteToken = db.verificationToken.delete({ where: { id: existingToken.id } })

  await db.$transaction([updateEmailVerified, deleteToken])

  return { success: "Email verified!" }
}
