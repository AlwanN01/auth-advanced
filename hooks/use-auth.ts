import { useContext, useEffect, useState } from "react"
import { Session } from "next-auth"

import { AuthContext } from "@/providers/auth-provider"

export const useAuth = () => {
  const auth = useContext(AuthContext)
  const [session, setSession] = useState(auth)
  useEffect(() => {
    const getSession = async () => {
      const data = (await fetch("/api/auth/session", { cache: "no-cache" }).then(res =>
        res.json()
      )) as Session | null
      setSession(data?.user || null)
    }
    if (!auth) getSession()
  }, [auth])
  return session
}
