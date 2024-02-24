//#region Imports
"use client"

import type { FC } from "react"
import { useRouter } from "next/navigation"
import { Slot } from "@radix-ui/react-slot"

//#endregion Imports
type Props = { children: React.ReactNode; mode?: "modal" | "redirect"; asChild?: boolean }

const LoginButton: FC<Props> = ({ children, mode = "redirect", asChild }) => {
  const router = useRouter()
  const onClick = () => router.push("/auth/login")

  if (mode === "modal") {
    return <span>TODO: modal</span>
  }
  return (
    <Slot onClick={onClick} className="cursor-pointer">
      {children}
    </Slot>
  )
}

export default LoginButton
