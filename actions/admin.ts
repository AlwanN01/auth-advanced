"use server"

import { auth } from "@/lib/auth"

export const admin = async () => {
  const user = await auth()
  if (user?.role !== "ADMIN") return { error: "forbidden" }
  return { success: "allowed" }
}
