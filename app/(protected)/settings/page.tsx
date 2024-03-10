//#region Imports
import type { FC } from "react"

import { Signout } from "@/components/auth/signout"

import { auth } from "@/auth"

//#endregion Imports
type Props = {}

const SettingsPage: FC<Props> = async ({}) => {
  const session = await auth()

  return (
    <pre>
      {JSON.stringify(session, null, 2)}
      <Signout />
    </pre>
  )
}

export default SettingsPage
