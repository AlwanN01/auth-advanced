"use client"

//#region Imports
import type { FC, MouseEvent } from "react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"

//#endregion Imports
type Props = {}

export const Social: FC<Props> = ({}) => {
  const onClick = (provider: "google" | "github") => (e: MouseEvent) => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT })
  }
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={onClick("google")}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={onClick("github")}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  )
}
