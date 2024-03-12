"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"

import { db } from "@/lib/prisma"

import { signInServer } from "@/auth"
import { sendTwoFactorTokenEmail } from "@/mail/send-email"
import { DEFAULT_LOGIN_REDIRECT, loginRoute } from "@/routes"
import { LoginSchema } from "@/schemas/auth-schema"
import { generateTwoFactorToken, getTwoFactorTokenByEmail } from "@/services/token"
import { getUserByEmail } from "@/services/user"

export const login = async (values: LoginSchema) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) return { error: "Invalid Fields!" }

  const { email, password, code } = validatedFields.data
  try {
    const response = await signInServer("credentials", {
      email,
      password,
      redirect: false,
    })

    const origin = headers().get("origin")
    if (response == `${origin}${loginRoute}/?error=email-not-verified`) {
      return { error: "Email not verified!", success: "New Confirmation email sent" }
    }
    if (response == `${origin}${loginRoute}/?two-factor=true`) {
      if (!code) {
        const twoFactorToken = await generateTwoFactorToken(email)
        await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
        return { twoFactor: true }
      }
      const twoFactorToken = await getTwoFactorTokenByEmail(email)
      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: "Invalid code!" }
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date()
      if (hasExpired) return { error: "Code expired!" }

      const user = await getUserByEmail(email)
      if (!user) return { error: "Invalid email or password!" }

      await db.$transaction([
        db.twoFactorToken.delete({ where: { id: twoFactorToken.id } }),
        db.twoFactorConfirmation.upsert({
          where: { userId: user.id },
          create: { userId: user.id },
          update: {},
        }),
      ])
      await signInServer("credentials", {
        email,
        password,
        redirect: false,
      })
    }

    redirect(DEFAULT_LOGIN_REDIRECT)
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("actions\\login.ts:")
      console.log(error)
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password!" }
        case "AccessDenied":
          return { error: "Unauthorized!" }
        default:
          return { error: "Something went wrong!" }
      }
    }
    if (!values) return undefined //for add undefined on return type, because error NEXT_REDIRECT return undefined
    throw error
    // if (error instanceof Error) {
    //   if (error.message == "NEXT_REDIRECT") throw error
    // }
    // return { error: "Something went wrong!" }
  }
}

// export type LoginReturnType = Awaited<ReturnType<typeof login>>
