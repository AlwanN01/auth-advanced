import authConfig from "@/auth.config"
import { loginRoute } from "@/routes"
import { getUserById } from "@/services/user"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { Session } from "next-auth"

import { db } from "@/lib/prisma"

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
      // allow oauth withou email verification
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("user", user)
      if (account?.provider !== "credentials") return true

      if (!user.emailVerified) return false
      //TODO: add 2FA
      return true
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
