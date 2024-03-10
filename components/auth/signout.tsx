"use client"

import type { FC } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import toast from "react-hot-toast"

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
        const id = toast.loading("Loading...")
        try {
          //add delay
          setLoading(true)
          await signOut({ redirect: false })
          toast.success("Logout Successfuly", { id })
          router.push("/")
          setTimeout(() => router.refresh(), 100)
        } catch (error) {
          toast.error("Something went wrong.", { id })
        } finally {
          setTimeout(() => setLoading(false), 300)
        }
      }}
      onMouseOver={() => router.prefetch("/")}
    >
      Logout
    </Button>
  )
}

export { Signout }
