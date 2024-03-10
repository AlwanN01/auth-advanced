"use server"

import { sendPasswordResetEmail } from "@/mail/send-email"
import { ResetSchema } from "@/schemas/auth-schema"
import { generatePasswordResetToken } from "@/services/token"
import { getUserByEmail } from "@/services/user"

export const reset = async (values: ResetSchema) => {
  const validatedFields = ResetSchema.safeParse(values)

  if (!validatedFields.success) return { error: "Invalid Fields!" }

  const { email } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser) return { error: "Email not found!" }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

  return { success: `Success, please check your email!` }
}
