import { UserRole } from "@prisma/client"
import NextAuth, { DefaultSession, User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
    } & DefaultSession["user"]
  }
  interface User {
    emailVerified: Date | null
    role: UserRole
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
  }
}
declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: UserRole
  }
}