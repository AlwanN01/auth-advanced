import { useContext, useEffect, useState } from "react"
import { Session } from "next-auth"

import { AuthContext } from "@/providers/auth-provider"

type SessionState = (Required<Session["user"]> & { updateSession: () => Promise<void> }) | undefined
export const useAuth = () => {
  const auth = useContext(AuthContext)
  const [session, setSession] = useState(auth)
  const updateSession = async () => {
    const data = (await fetch("/api/auth/session", { cache: "no-cache" }).then(res =>
      res.json()
    )) as Session | undefined
    setSession(data?.user)
  }
  useEffect(() => void (!auth && updateSession()), [auth])
  if (session) (session as SessionState)!.updateSession = updateSession
  return session as Pretty<SessionState>
}
