import { UserRole } from "@prisma/client"
import NextAuth, { DefaultSession, User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
      isTwoFactorEnabled: boolean
    } & DefaultSession["user"]
  }
  interface User {
    emailVerified: Date | null
    role: UserRole
    isTwoFactorEnabled: boolean
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
    isTwoFactorEnabled: boolean
  }
}
declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: UserRole
    isTwoFactorEnabled: boolean
  }
}
