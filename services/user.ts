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
type CreateUserProps = Pick<User, "email" | "name" | "password">
export const createUser = async ({ email, name, password }: CreateUserProps) => {
  try {
    return await db.user.create({ data: { email, name, password } })
  } catch (error) {
    return null
  }
}

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    return await db.twoFactorConfirmation.findUnique({ where: { userId } })
  } catch (error) {
    return null
  }
}

export const deleteTwoFactorConfirmationById = async (id: string) => {
  try {
    return await db.twoFactorConfirmation.delete({ where: { id } })
  } catch (error) {
    return null
  }
}

export const getAccountByUserId = async (userId: string) => {
  try {
    return await db.account.findFirst({ where: { userId } })
  } catch (error) {
    return null
  }
}
