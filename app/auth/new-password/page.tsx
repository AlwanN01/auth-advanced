//#region Imports
import type { FC } from "react"

import { NewPasswordForm } from "@/components/auth/new-password-form"
import { SuspenseWrapper } from "@/components/suspense-wrapper"

//#endregion Imports
type Props = {}

const AuthNewPasswordPage: FC<Props> = ({}) => {
  return (
    <SuspenseWrapper>
      <NewPasswordForm />
    </SuspenseWrapper>
  )
}

export default AuthNewPasswordPage
