"use client"

//#region Imports
import type { Route } from "next"
import type { FC } from "react"
import Link from "next/link"

import { Button } from "@/components/ui"

//#endregion Imports
type Props = {
  href: Route | URL
  label: string
}

export const BackButton = (({ href, label }) => {
  return (
    <Button variant="link" className="w-full font-normal" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  )
}) satisfies FC<Props>
