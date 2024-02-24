//#region Imports
import type { FC } from "react"
import { CheckCircledIcon, ExclamationTriangleIcon, InfoCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

//#endregion Imports
type Props = { message?: string; type: "error" | "warning" | "success" }

export const FormNotification: FC<Props> = ({ message, type }) => {
  if (!message) return null
  return (
    <section
      className={cn("flex items-center gap-x-2 rounded-md  p-3 text-sm", {
        "bg-destructive/15 text-destructive": type === "error",
        "bg-emerald-500/15 text-emerald-500": type === "success",
        "bg-amber-500/15 text-amber-500": type === "warning",
      })}
    >
      {type === "error" && <ExclamationTriangleIcon className="h-4 w-4" />}
      {type === "warning" && <InfoCircledIcon className="h-4 w-4" />}
      {type === "success" && <CheckCircledIcon className="h-4 w-4" />}
      <p>{message}</p>
    </section>
  )
}
