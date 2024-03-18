import * as bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import github from "next-auth/providers/github"
import google, { GoogleProfile } from "next-auth/providers/google"

import { LoginSchema } from "@/schemas/auth-schema"
import { getUserByEmail } from "@/services/user"

export default {
  trustHost: true,
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await getUserByEmail(email) //bypass, prisma is not yet compatible with edge runtime
          // !user.password if user try to login with credential after create an acount using google/github provider
          if (!user || !user.password) return null
          const isPasswordMatch = await bcrypt.compare(password, user.password)
          if (isPasswordMatch) return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
