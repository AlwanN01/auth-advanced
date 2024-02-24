"use client"

//#region Imports
import type { FC } from "react"
import { useState } from "react"
import { register } from "@/actions/register"
import { RegisterSchema, registerSchema, registerSchemaDefaultValues } from "@/schemas/auth-schema"
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

export const RegisterForm: FC<Props> = ({}) => {
  const [success, setSuccess] = useState<string | undefined>("")
  const [error, setError] = useState<string | undefined>("")
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerSchemaDefaultValues,
  })
  const isPending = form.formState.isSubmitting
  const onSubmit = async (data: RegisterSchema) => {
    const { error, success } = await register(data)
    setSuccess(success)
    setError(error)
  }
  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="john" type="name" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <FormNotification type="success" message={success} />
          <FormNotification type="error" message={error} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Sign up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
