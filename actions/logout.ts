"use server"

import { redirect } from "next/navigation"
import { signOutServer } from "@/auth"
import { loginRoute } from "@/routes"

export const logout = async () => {
  await signOutServer({ redirect: true })

  // redirect(loginRoute)
}
