import { v4 as uuidv4 } from "uuid"

import { db } from "@/lib/prisma"

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

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await db.verificationToken.findFirst({ where: { email } })
  } catch (error) {
    return null
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return await db.verificationToken.findFirst({ where: { token } })
  } catch (error) {
    return null
  }
}
