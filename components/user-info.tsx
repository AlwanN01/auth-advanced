//#region Imports
import type { FC } from "react"
import { User } from "next-auth"

import { Card, CardContent, CardHeader } from "@/components/ui"
import { Badge } from "@/components/ui/badge"

//#endregion Imports
type Props = {
  user?: User
  label: string
}

export const UserInfo: FC<Props> = ({ user, label }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-center text-2xl font-semibold text-muted-foreground">{label}</h2>
      </CardHeader>
      <CardContent>
        <table className="w-full">
          <tbody className="space-y-5">
            <TRow label="Id">{user?.id}</TRow>
            <TRow label="Name">{user?.name}</TRow>
            <TRow label="Email">{user?.email}</TRow>
            <TRow label="Role">{user?.role}</TRow>
            <TRow label="Two Factor Authentification">
              <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                {user?.isTwoFactorEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </TRow>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

const TRow = ({ children, label }: { children: React.ReactNode; label: string }) => {
  return (
    <tr className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <th className="text-sm font-medium">{label}</th>
      <td
        className={
          typeof children == "string" || typeof children == "number"
            ? "max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs hover:overflow-auto hover:text-clip"
            : ""
        }
      >
        {children}
      </td>
    </tr>
  )
}
