//#region Imports
import type { FC } from "react"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import { CardWrapper } from "@/components/auth/card-wrapper"

//#endregion Imports
type Props = {}

export const ErrorCard: FC<Props> = ({}) => {
  return (
    <CardWrapper
      headerLabel="Oops,Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="flex w-full items-center justify-center">
        <ExclamationTriangleIcon className="h-10 w-10 text-destructive" />
      </div>
    </CardWrapper>
  )
}
