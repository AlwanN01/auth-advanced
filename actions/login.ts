"use server"

import { redirect } from "next/navigation"
import { AuthError } from "next-auth"

import { signInServer } from "@/auth"
import { sendVerificationEmail } from "@/mail/send-verification"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema, loginSchema } from "@/schemas/auth-schema"
import { getUserByEmail } from "@/services/user"
import { generateVerificationToken } from "@/services/verification-token"

export const login = async (values: LoginSchema) => {
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) return { error: "Invalid Fields!" }

  const { email, password } = validatedFields.data
  const user = await getUserByEmail(email)

  if (!user || !user.email || !user.password) return { error: "Email does not exist!" }

  // if (!user.emailVerified) {
  //   const verificationToken = await generateVerificationToken(user.email)
  //   return { success: "Confirmation email sent", verificationToken }
  // }
  try {
    const response = await signInServer("credentials", {
      email,
      password,
      redirect: false,
      // redirectTo: DEFAULT_LOGIN_REDIRECT, // set if redirect true
    })
    redirect(DEFAULT_LOGIN_REDIRECT)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password!" }
        case "AuthorizedCallbackError":
          const verificationToken = await generateVerificationToken(user.email)

          await sendVerificationEmail(verificationToken.email, verificationToken.token)

          return {
            error: "Unauthorized!, please verify your email!",
            success: "New Confirmation email sent",
          }
        default:
          return { error: "Something went wrong!" }
      }
    }
    throw error // if redirect true
  }
}

export type LoginReturnType = Awaited<ReturnType<typeof login>>
