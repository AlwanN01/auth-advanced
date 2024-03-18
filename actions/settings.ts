"use server"

import { compare, hash } from "bcryptjs"

import { auth } from "@/lib/auth"
import { db } from "@/lib/prisma"

import { sendVerificationEmail } from "@/mail/send-email"
import { SettingsSchema } from "@/schemas/auth-schema"
import { generateVerificationToken } from "@/services/token"
import { getUserByEmail, getUserById } from "@/services/user"

export const settings = async (values: SettingsSchema) => {
  const result = SettingsSchema.safeParse(values)
  if (!result.success) return { error: "Invalid Fields!" }
  const session = await auth()
  if (!session) return { error: "Unauthorized" }

  const user = await getUserById(session.id)
  if (!user) return { error: "Unauthorized" }

  const { data } = result
  if (session.isOAuth) {
    data.email = undefined
    data.password = undefined
    data.newPassword = undefined
    data.isTwoFactorEnabled = undefined
  }
  if (data.email && data.email !== user.email) {
    const existingUser = await getUserByEmail(data.email)
    if (existingUser && existingUser.id !== user.id) return { error: "Email already exists!" }
    const verificationToken = await generateVerificationToken(data.email)
    if (!verificationToken)
      return { error: "Something went wrong while generating verification token" }
    const sendEmailResponse = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
    if (sendEmailResponse.error)
      return { error: "Something went wrong while sending verification email" }
    return { success: "Verification email sent" }
  }
  if (data.password && data.newPassword && user.password) {
    const isPasswordMatch = await compare(data.password, user.password)
    if (!isPasswordMatch) return { error: "Incorrect password!" }
    const hashedPassword = await hash(data.newPassword, 10)
    data.password = hashedPassword
    data.newPassword = undefined
  }
  try {
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data,
    })
    return { success: "Settings updated successfully." }
  } catch (error) {
    return { error: "Something went wrong while updating settings." }
  }
}
