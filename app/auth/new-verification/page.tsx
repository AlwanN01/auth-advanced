//#region Imports
import type { FC } from "react"

import { NewVerificationForm } from "@/components/auth/new-verification-form"
import { SuspenseWrapper } from "@/components/suspense-wrapper"

//#endregion Imports
type Props = {}

const AuthNewVerificationPage: FC<Props> = ({}) => {
  return (
    <SuspenseWrapper>
      <NewVerificationForm />
    </SuspenseWrapper>
  )
}

export default AuthNewVerificationPage
