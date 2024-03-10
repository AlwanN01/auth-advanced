//#region Imports
import type { FC } from "react"

import { AuthProvider } from "@/providers/auth-provider"

import { auth } from "@/auth"

//#endregion Imports
type Props = { children: React.ReactNode }

const ProtectedLayout = (async ({ children }) => {
  const session = await auth()
  return <AuthProvider value={session}>{children}</AuthProvider>
}) satisfies FC<Props>

export default ProtectedLayout
