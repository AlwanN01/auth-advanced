import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { Session } from "next-auth"

import { db } from "@/lib/prisma"

import authConfig from "@/auth.config"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/mail/send-email"
import { loginRoute } from "@/routes"
import { generateTwoFactorToken, generateVerificationToken } from "@/services/token"
import { deleteTwoFactorConfirmationById, getTwoFactorConfirmationByUserId } from "@/services/user"

export const {
  handlers: { GET, POST },
  auth,
  signIn: signInServer,
  signOut: signOutServer,
} = NextAuth({
  pages: {
    signIn: loginRoute,
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user, account }) {
      console.log("auth.ts:")
      console.log(user)
      // allow oauth withou email verification
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true
      try {
        if (!user.emailVerified) {
          const verificationToken = await generateVerificationToken(user.email!)

          await sendVerificationEmail(verificationToken.email, verificationToken.token)
          return `${loginRoute}/?error=email-not-verified`
        }
        if (user.isTwoFactorEnabled) {
          const twoFactorConfirm = await getTwoFactorConfirmationByUserId(user.id!)
          if (!twoFactorConfirm) {
            return `${loginRoute}/?two-factor=true`
          }
          await deleteTwoFactorConfirmationById(twoFactorConfirm.id)
        }
        return true
      } catch (error) {
        return false
      }
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session as Session
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
