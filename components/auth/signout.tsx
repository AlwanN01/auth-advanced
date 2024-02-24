"use client"

import type { FC } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

type Props = {}

const Signout: FC<Props> = ({}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={loading}
      onClick={async () => {
        try {
          await signOut({ redirect: false })
          router.push("/")
          setTimeout(() => router.refresh(), 100)
        } catch (error) {
        } finally {
          setTimeout(() => setLoading(false), 300)
        }
      }}
    >
      Logout
    </Button>
  )
}

export { Signout }
