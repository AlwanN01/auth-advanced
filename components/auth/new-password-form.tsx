"use client"

//#region Imports
import type { FC } from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { newPassword } from "@/actions"
import { useMergeState } from "@/hooks"

import { Button, Input } from "@/components/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormNotification } from "@/components/form-notification"

import { tokenParam } from "@/common"
import { newPasswordDefault, NewPasswordSchema } from "@/schemas/auth-schema"

//#endregion Imports

type Props = {}

export const NewPasswordForm: FC<Props> = ({}) => {
  const searchParams = useSearchParams()
  const token = searchParams.get(tokenParam)
  const [{ error, success }, setMessage] = useMergeState({ error: "", success: "" })
  const form = useForm<NewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: newPasswordDefault,
  })

  const isPending = form.formState.isSubmitting
  const onSubmit = async (data: NewPasswordSchema) => {
    const { error, success } = await newPassword(data, token)
    setMessage({ error, success })
    // TODO: add when we add 2FA
  }
  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="*****" type="password" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormNotification type="error" message={error} />
          <FormNotification type="success" message={success} />
          <Button type="submit" className="w-full" disabled={isPending || !!success}>
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
