"use client"

import type { FC } from "react"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import toast from "react-hot-toast"

import { Button, ButtonProps } from "@/components/ui/button"

type Props = ButtonProps

const Signout: FC<Props> = props => {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  console.log("components\\auth\\signout.tsx:")
  console.log(pathname)
  const onClick = async () => {
    const id = toast.loading("Loading...")
    try {
      //add delay
      setLoading(true)
      await signOut({ redirect: false })
      toast.success("Logout Successfuly", { id })
      router.push(pathname)
      setTimeout(() => router.refresh(), 100)
    } catch (error) {
      toast.error("Something went wrong.", { id })
    } finally {
      setTimeout(() => setLoading(false), 300)
    }
  }
  const onMouseOver = () => router.prefetch("/")
  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={loading}
      onClick={onClick}
      onMouseOver={onMouseOver}
      {...props}
    />
  )
}

export { Signout }
