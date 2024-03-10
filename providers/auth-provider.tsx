"use client"

//#region Imports
import { createContext, type FC } from "react"
import { Session } from "next-auth"

//#endregion Imports
type Props = { children: React.ReactNode; value: Session | null }

export const AuthContext = createContext<Session["user"] | null>(null)

export const AuthProvider: FC<Props> = ({ children, value = null }) => {
  return <AuthContext.Provider value={value?.user || null}>{children}</AuthContext.Provider>
}
