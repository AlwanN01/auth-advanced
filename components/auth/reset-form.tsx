"use client"

//#region Imports
import type { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { reset } from "@/actions"
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

import { resetDefault, ResetSchema } from "@/schemas/auth-schema"

//#endregion Imports

type Props = {}

export const ResetForm: FC<Props> = ({}) => {
  const [{ error, success }, setMessage] = useMergeState({ error: "", success: "" })
  const form = useForm<ResetSchema>({
    resolver: zodResolver(ResetSchema),
    defaultValues: resetDefault,
  })

  const isPending = form.formState.isSubmitting
  const onSubmit = async (data: ResetSchema) => {
    const { error, success } = await reset(data)
    setMessage({ error, success })
    // TODO: add when we add 2FA
  }
  console.log("components\\auth\\reset-form.tsx:")
  console.log({ error, success })
  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john@example.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormNotification type="error" message={error} />
          <FormNotification type="success" message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export type ResetForm = typeof ResetForm
