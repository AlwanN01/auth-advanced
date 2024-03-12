import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { Session } from "next-auth"

import { db } from "@/lib/prisma"

import authConfig from "@/auth.config"
import { sendVerificationEmail } from "@/mail/send-email"
import { loginRoute } from "@/routes"
import { generateVerificationToken } from "@/services/token"
import {
  deleteTwoFactorConfirmationById,
  getAccountByUserId,
  getTwoFactorConfirmationByUserId,
  getUserById,
} from "@/services/user"

export const {
  handlers: { GET, POST },
  auth: session,
  signIn: signInServer,
  signOut: signOutServer,
  unstable_update: updateSession,
} = NextAuth({
  pages: {
    signIn: loginRoute,
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user, account }) {
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
          if (!verificationToken) return false
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
    async jwt({ token }) {
      // if (user) (token.role = user.role), (token.isTwoFactorEnabled = user.isTwoFactorEnabled)
      if (!token.sub) return token

      const user = await getUserById(token.sub)
      if (!user) return token

      const account = await getAccountByUserId(user.id)

      token.isOAuth = !!account
      token.name = user.name
      token.role = user.role
      token.isTwoFactorEnabled = user.isTwoFactorEnabled
      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.isOAuth = token.isOAuth
        session.user.name = token.name
        session.user.role = token.role
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled
      }
      return session as Session
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
