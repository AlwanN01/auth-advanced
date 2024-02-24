import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "@/schemas/auth-schema"
import { getUserByEmail } from "@/services/user"
import { compare } from "bcryptjs"
import credentials from "next-auth/providers/credentials"
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"

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
        const validatedFields = loginSchema.safeParse(credentials)
        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await getUserByEmail(email) //bypass, prisma is not yet compatible with edge runtime
          // !user.password if user try to login with credential after create an acount using google/github provider
          if (!user || !user.password) return null
          const isPasswordMatch = await compare(password, user.password)
          if (isPasswordMatch) return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig