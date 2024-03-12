//#region Imports
import type { FC } from "react"

import { AuthProvider } from "@/providers/auth-provider"
import { auth } from "@/lib/auth"

import { Navbar } from "@/app/(protected)/_components/navbar"

//#endregion Imports
type Props = { children: React.ReactNode }

const ProtectedLayout = (async ({ children }) => {
  const user = await auth()
  return (
    <AuthProvider value={user}>
      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-y-5 p-1">
        <Navbar />
        {children}
      </div>
    </AuthProvider>
  )
}) satisfies FC<Props>

export default ProtectedLayout
