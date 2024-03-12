//#region Imports
import type { FC } from "react"

import { RegisterForm } from "@/components/auth/register-form"
import { SuspenseWrapper } from "@/components/suspense-wrapper"

//#endregion Imports
type Props = {}

const registerPage: FC<Props> = ({}) => {
  return (
    <SuspenseWrapper>
      <RegisterForm />
    </SuspenseWrapper>
  )
}

export default registerPage
