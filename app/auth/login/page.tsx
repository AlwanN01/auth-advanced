//#region Imports
import type { FC } from "react"

import { LoginForm } from "@/components/auth/login-form"
import { SuspenseWrapper } from "@/components/suspense-wrapper"

//#endregion Imports
type Props = {}

const LoginPage: FC<Props> = ({}) => {
  return (
    <SuspenseWrapper>
      <LoginForm />
    </SuspenseWrapper>
  )
}

export default LoginPage
