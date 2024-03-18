"use server"

import { hash } from "bcryptjs"

import { sendVerificationEmail } from "@/mail/send-email"
import { RegisterSchema } from "@/schemas/auth-schema"
import { generateVerificationToken } from "@/services/token"
import { createUser, getUserByEmail } from "@/services/user"

export const register = async (values: RegisterSchema) => {
  const validatedFields = RegisterSchema.safeParse(values)
  if (!validatedFields.success) return { error: "Invalid Fields!" }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await hash(password, 10)
  const existingUser = await getUserByEmail(email)

  if (existingUser) return { error: "Email already in use!" }
  // if (existingUser && existingUser.password) return { error: "Email already in use!" }

  const cratedUser = await createUser({ email, name, password: hashedPassword })
  if (!cratedUser) return { error: "Something went wrong while creating a user" }
  const verificationToken = await generateVerificationToken(email)
  if (!verificationToken)
    return { error: "Something went wrong while generating verification token" }
  const sendEmailResponse = await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  )
  if (sendEmailResponse.error)
    return { error: "Something went wrong while sending verification email" }

  return { success: `Success, please verify your email!` }
}
