"use client"

//#region Imports
import type { FC } from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { login } from "@/actions/login"
import { LoginSchema, loginSchema, loginSchemaDefaultValues } from "@/schemas/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { Button, Input } from "@/components/ui"

//#endregion Imports

type Props = {}

export const LoginForm: FC<Props> = ({}) => {
  const searchParams = useSearchParams()
  const urlErrorMessage =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : ""
  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string | undefined>("")
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginSchemaDefaultValues,
  })
  const isPending = form.formState.isSubmitting
  const onSubmit = async (data: LoginSchema) => {
    const response = await login(data)
    setError(response?.error)
    setSuccess(response?.success)
    // TODO: add when we add 2FA
  }
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      showSocial
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
          <FormNotification type="error" message={error || urlErrorMessage} />
          <FormNotification type="success" message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Sign in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
