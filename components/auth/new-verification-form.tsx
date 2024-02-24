"use client"

//#region Imports
import { useCallback, useEffect, useRef, type FC } from "react"
import { useSearchParams } from "next/navigation"
import { BeatLoader } from "react-spinners"

import { newVerification } from "@/actions"
import { useMergeState } from "@/hooks"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormNotification } from "@/components/form-notification"

import { tokenParam } from "@/common"

//#endregion Imports
type Props = {}

export const NewVerificationForm: FC<Props> = ({}) => {
  const [message, setMessage] = useMergeState({ success: "", error: "" })
  const searchParams = useSearchParams()
  const initialized = useRef(false)
  const token = searchParams.get(tokenParam)
  const onSubmit = useCallback(async () => {
    if (message.error || message.success) return
    if (!token) return setMessage({ error: "Missing Token!" })
    try {
      const { success, error } = await newVerification(token)
      setMessage({ success, error })
    } catch (error) {
      setMessage({ error: "Something went wrong!" })
    }
  }, [message.error, message.success, setMessage, token])
  console.log(token)
  useEffect(() => {
    if (!initialized.current) onSubmit()
    initialized.current = true
  }, [onSubmit])
  console.log(message)
  return (
    <CardWrapper
      headerLabel="Verify your email"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="flex w-full items-center justify-center">
        {!message.success && !message.error && <BeatLoader />}
        <FormNotification message={message.success} type="success" />
        <FormNotification message={message.error} type="error" />
      </div>
    </CardWrapper>
  )
}
