//#region Imports
import type { FC } from "react"
import { poppins } from "@/fonts/poppins"

import { cn } from "@/lib/utils"

//#endregion Imports
type Props = { label: string }

export const Header: FC<Props> = ({ label }) => {
  return (
    <header className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn("font-semibold", poppins.className)}>🔐Auth</h1>
      <p className="text-muted-foreground">{label}</p>
    </header>
  )
}
