//#region Imports
"use client"

import type { FC } from "react"
import { useRouter } from "next/navigation"
import { Slot } from "@radix-ui/react-slot"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { LoginForm } from "@/components/auth/login-form"

//#endregion Imports
type Props = { children: React.ReactNode; mode?: "modal" | "redirect"; asChild?: boolean }

const LoginButton: FC<Props> = ({ children, mode = "redirect", asChild }) => {
  const router = useRouter()
  const onClick = () => router.push("/auth/login")

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="w-auto rounded-lg border-none p-0">
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Slot onClick={onClick} className="cursor-pointer">
      {children}
    </Slot>
  )
}

export default LoginButton
