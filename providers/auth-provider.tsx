"use client"

//#region Imports
import { createContext, type FC } from "react"
import { Session } from "next-auth"

//#endregion Imports
type Props = { children: React.ReactNode; value?: Session["user"] }

export const AuthContext = createContext<Session["user"] | undefined>(undefined)

export const AuthProvider: FC<Props> = ({ children, value }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
