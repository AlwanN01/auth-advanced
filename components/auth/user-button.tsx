"use client"

//#region Imports
import type { FC } from "react"
import { ExitIcon } from "@radix-ui/react-icons"
import { FaUser } from "react-icons/fa"

import { useAuth } from "@/hooks"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Signout } from "@/components/auth/signout"

//#endregion Imports
type Props = {}

export const UserButton: FC<Props> = ({}) => {
  const user = useAuth()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-gradient-primary">
            <FaUser className="text-background" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Signout variant="ghost" className="w-full justify-start p-0">
          <DropdownMenuItem>
            <ExitIcon className="mr-2 h-4 w-4" />
            Log Out
          </DropdownMenuItem>
        </Signout>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
