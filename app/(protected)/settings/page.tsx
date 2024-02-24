//#region Imports
import type { FC } from "react"
import { logout } from "@/actions/logout"
import { auth } from "@/auth"

//#endregion Imports
type Props = {}

const SettingsPage: FC<Props> = async ({}) => {
  const session = await auth()
  const onSignOut = async () => {
    "use server"
    await logout()
  }
  return (
    <div>
      {JSON.stringify(session)}
      <form action={onSignOut}>
        <button type="submit">Sign Out</button>
      </form>
    </div>
  )
}

export default SettingsPage
