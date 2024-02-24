//#region Imports
import type { FC } from "react"

import { ErrorCard } from "@/components/auth/error-card"

//#endregion Imports
type Props = {}

const AuthErrorPage: FC<Props> = ({}) => {
  return <ErrorCard />
}

export default AuthErrorPage
