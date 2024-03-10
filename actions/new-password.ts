"use server"

import bcrypt from "bcryptjs"

import { db } from "@/lib/prisma"

import { NewPasswordSchema } from "@/schemas/auth-schema"
import { getPasswordResetTokenByToken } from "@/services/token"
import { getUserByEmail } from "@/services/user"

export const newPassword = async (values: NewPasswordSchema, token: string | null) => {
  if (!token) return { error: "Missing Token!" }

  const validatedFields = NewPasswordSchema.safeParse(values)
  if (!validatedFields.success) return { error: "Invalid Fields!" }

  const { password } = validatedFields.data
  const existingToken = await getPasswordResetTokenByToken(token)
  if (!existingToken) return { error: "Invalid Token!" }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) return { error: "Token has expired!" }

  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) return { error: "Email does not exist!" }

  const hashedPassword = await bcrypt.hash(password, 10)

  const updatedUser = db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  })
  const deletedToken = db.passwordResetToken.delete({ where: { id: existingToken.id } })

  await db.$transaction([updatedUser, deletedToken])

  return { success: "Password Reset Successful!" }
}
