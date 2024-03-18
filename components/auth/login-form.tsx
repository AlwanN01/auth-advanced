"use client"

//#region Imports
import type { FC } from "react"
import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { login } from "@/actions/login"
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
import { OtpCodeInput } from "@/components/otp-code-input"

import { LoginSchema, loginSchemaDefaultValues } from "@/schemas/auth-schema"

//#endregion Imports

type Props = {}

export const LoginForm: FC<Props> = ({}) => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const urlErrorMessage =
    searchParams.get("error") === "email-not-verified"
      ? "Email not verified!"
      : searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : ""
  const urlSuccessMessage =
    searchParams.get("error") === "email-not-verified" ? "New Confirmation email sent" : ""
  const [{ success, error, showTwoFactor }, setState] = useMergeState({
    success: "",
    error: "",
    showTwoFactor: false,
  })

  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: loginSchemaDefaultValues,
  })
  const isPending = form.formState.isSubmitting
  const onSubmit = async (data: LoginSchema) => {
    console.log("components\\auth\\login-form.tsx:")
    console.log(callbackUrl)
    setState({ error: "", success: "" })
    const code = form.getValues().code
    if (showTwoFactor) {
      if (!code) return form.setError("code", { message: "Code is required" })
      if (code.length < 6) return form.setError("code", { message: "Code must be 6 digits" })
    }
    try {
      const response = await login(data, callbackUrl)
      if (response?.error) {
        showTwoFactor ? form.resetField("code") : form.resetField("password")
        setState({ error: response.error })
      }
      if (response?.success) setState({ success: response.success })
      if (response?.twoFactor)
        setState({ showTwoFactor: true, success: "Two Factor Code has been sent!" })
    } catch (error) {
      setState({ error: "Something went wrong!" })
    }
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
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <OtpCodeInput
                        {...field}
                        onComplete={() => form.handleSubmit(onSubmit)()}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
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
                        <Input
                          {...field}
                          placeholder="*****"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <Button size="sm" variant="link" className="px-0 font-normal" asChild>
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormNotification type="error" message={error || urlErrorMessage} />
          <FormNotification type="success" message={success || urlSuccessMessage} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {showTwoFactor ? "Submit" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
