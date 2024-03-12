"use client"

//#region Imports
import type { FC } from "react"
import toast from "react-hot-toast"

import { admin } from "@/actions"

import { Button, Card, CardContent, CardHeader } from "@/components/ui"
import { RoleGate } from "@/components/auth/role-gate"
import { FormNotification } from "@/components/form-notification"

//#endregion Imports
type Props = {}

const ProtectedAdminPage: FC<Props> = ({}) => {
  const onApiRouteClick = async () => {
    const id = toast.loading("API route in progress...")
    const res = await fetch("/api/admin")
    if (res.ok) toast.success("API route is working!", { id })
    else toast.error("API route is Forbidden!", { id })
  }
  const onServerActionClick = async () => {
    const id = toast.loading("Action in progress...")
    const res = await admin()
    if (res.success) toast.success(res.success, { id })
    if (res.error) toast.error(res.error, { id })
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-center text-2xl font-semibold text-muted-foreground">🗝️ Admin</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole="ADMIN">
          <FormNotification type="success" message="You are an admin!" />
        </RoleGate>
        <table className="w-full">
          <tbody className="flex flex-col gap-2">
            <tr className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <td className="text-sm font-medium">Admin-only API Route</td>
              <Button as="td" onClick={onApiRouteClick}>
                Click to test
              </Button>
            </tr>
            <tr className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <td className="text-sm font-medium">Admin-only Server Action</td>
              <Button as="td" onClick={onServerActionClick}>
                Click to test
              </Button>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export default ProtectedAdminPage
