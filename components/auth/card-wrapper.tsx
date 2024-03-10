"use client"

//#region Imports
import type { FC } from "react"
import type { Route } from "next"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui"
import { BackButton } from "@/components/auth/back-button"
import { Header } from "@/components/auth/header"
import { Social } from "@/components/auth/social"

//#endregion Imports
type Props = {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: Route | URL
  showSocial?: boolean
}

export const CardWrapper: FC<Props> = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
