//#region Imports
import type { FC } from "react"

import { auth } from "@/lib/auth"

import { UserInfo } from "@/components/user-info"

//#endregion Imports
type Props = {}

const ProtectedServerPage: FC<Props> = async ({}) => {
  const user = await auth()
  return <UserInfo user={user} label="🖥️ Server Component" />
}

export default ProtectedServerPage
