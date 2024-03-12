"use client"

//#region Imports
import type { FC } from "react"

import { useAuth } from "@/hooks"

import { UserInfo } from "@/components/user-info"

//#endregion Imports
type Props = {}

const ProtectedClientPage: FC<Props> = ({}) => {
  const user = useAuth()

  return <UserInfo user={user} label="🧑‍💻 Client Component" />
}

export default ProtectedClientPage
