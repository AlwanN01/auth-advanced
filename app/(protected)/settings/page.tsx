"use client"

//#region Imports
import type { FC } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRole } from "@prisma/client"
import { useForm } from "react-hook-form"

import { settings } from "@/actions"
import { useAuth, useMergeState } from "@/hooks"

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { FormNotification } from "@/components/form-notification"

import { SettingsSchema } from "@/schemas/auth-schema"

//#endregion Imports
type Props = {}
const SettingsPage: FC<Props> = ({}) => {
  const session = useAuth()
  const router = useRouter()
  const [state, setState, resetState] = useMergeState({ success: "", error: "" })
  const form = useForm<SettingsSchema>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: session?.name || undefined,
      email: session?.email || undefined,
      isTwoFactorEnabled: session?.isTwoFactorEnabled || false,
      role: session?.role || undefined,
    },
  })
  const onSubmit = async (values: SettingsSchema) => {
    try {
      resetState()
      const res = await settings(values)
      if (res.success) setState({ success: res.success })
      if (res.error) setState({ error: res.error })
      router.refresh()
    } catch (error) {
      setState({ error: "Something went wrong" })
    }
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-center text-2xl font-semibold text-muted-foreground">⚙️ Settings</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!session?.isOAuth && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <input
                    type="password"
                    tabIndex={-1}
                    aria-label="nothing, skip this input"
                    className="fixed -z-50 opacity-0"
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
                            placeholder="******"
                            type="password"
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NewPassword</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="******"
                            type="password"
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>{UserRole.ADMIN}</SelectItem>
                          <SelectItem value={UserRole.USER}>{UserRole.USER}</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!session?.isOAuth && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable or disable two factor authentication
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormNotification type="success" message={state.success} />
            <FormNotification type="error" message={state.error} />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SettingsPage
