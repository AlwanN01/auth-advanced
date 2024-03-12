"use client"

//#region Imports
import type { FC } from "react"
import { UserRole } from "@prisma/client"

import { useAuth } from "@/hooks"

import { FormNotification } from "@/components/form-notification"

//#endregion Imports
type Props = {
  children: React.ReactNode
  allowedRole: UserRole
}

export const RoleGate: FC<Props> = ({ children, allowedRole }) => {
  const user = useAuth()
  if (user?.role !== allowedRole) {
    return (
      <FormNotification message="You do not have permission to view this content!" type="error" />
    )
  }
  return <>{children}</>
}
