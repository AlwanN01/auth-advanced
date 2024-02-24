"use server"

import { hash } from "bcryptjs"

import { sendVerificationEmail } from "@/mail/send-verification"
import { RegisterSchema, registerSchema } from "@/schemas/auth-schema"
import { createUser, getUserByEmail } from "@/services/user"
import { generateVerificationToken } from "@/services/verification-token"

export const register = async (values: RegisterSchema) => {
  const validatedFields = registerSchema.safeParse(values)
  if (!validatedFields.success) return { error: "Invalid Fields!" }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await hash(password, 10)
  const existingUser = await getUserByEmail(email)

  if (existingUser) return { error: "Email already in use!" }

  await createUser({ email, name, password: hashedPassword })

  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: `Success, please verify your email!` }
}
