import { User } from "@prisma/client"

import { db } from "@/lib/prisma"

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } })
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({ where: { id } })
  } catch (error) {
    return null
  }
}
type CreateUserPayload = Pick<User, "email" | "name" | "password">
export const createUser = async ({ email, name, password }: CreateUserPayload) => {
  try {
    return await db.user.create({ data: { email, name, password } })
  } catch (error) {
    return null
  }
}
