import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/lib/prisma"

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  const expires = new Date(new Date().getTime() + 15 * 60 * 1000) // 15 minutes
  const existingToken = await getTwoFactorTokenByEmail(email)
  return await db.twoFactorToken.upsert({
    where: { id: existingToken?.id || "" },
    create: { email, token, expires },
    update: { token, expires },
  })
}

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour
  const existingToken = await getVerificationTokenByEmail(email)
  return await db.verificationToken.upsert({
    where: { id: existingToken?.id || "" },
    create: { email, token, expires },
    update: { token, expires },
  })
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour
  const existingToken = await getPasswordResetTokenByEmail(email)
  return await db.passwordResetToken.upsert({
    where: { id: existingToken?.id || "" },
    create: { email, token, expires },
    update: { token, expires },
  })
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await db.verificationToken.findFirst({ where: { email } })
  } catch (error) {
    return null
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return await db.verificationToken.findUnique({ where: { token } })
  } catch (error) {
    return null
  }
}

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    return await db.passwordResetToken.findUnique({ where: { token } })
  } catch (error) {
    return null
  }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    return await db.passwordResetToken.findFirst({ where: { email } })
  } catch (error) {
    return null
  }
}

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    return await db.twoFactorToken.findUnique({ where: { token } })
  } catch (error) {
    return null
  }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    return await db.twoFactorToken.findFirst({ where: { email } })
  } catch (error) {
    return null
  }
}
