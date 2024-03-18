"use client"

//#region Imports
import type { FC } from "react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { useSticky } from "@/hooks"

import { Button } from "@/components/ui"
import { Link } from "@/components/ui/dynamic-link"
// import { DynamicLink } from "@/components/ui/dynamic-link"
import { UserButton } from "@/components/auth/user-button"

//#endregion Imports
type Props = {}

export const Navbar: FC<Props> = ({}) => {
  const { ref, isSticky } = useSticky()
  const pathname = usePathname()
  return (
    <div ref={ref} className={cn("top-0 z-50 w-full", isSticky && "sticky")}>
      <nav
        className={cn(
          "flex items-center justify-between overflow-hidden rounded-xl bg-secondary/70 px-3 py-2 shadow-sm transition hover:overflow-auto",
          isSticky && "top-0 z-50 scale-90 border border-primary/20 bg-transparent shadow-lg"
        )}
      >
        <menu className="flex gap-x-2" aria-label="Main menu">
          <Button variant={pathname == "/server" ? "default" : "outline"} as="li" asChild>
            <Link href="/server">Server</Link>
          </Button>
          <Button variant={pathname == "/client" ? "default" : "outline"} as="li" asChild>
            <Link href="/client">Client</Link>
          </Button>
          <Button variant={pathname == "/admin" ? "default" : "outline"} as="li" asChild>
            <Link href="/admin">Admin</Link>
          </Button>
          <Button variant={pathname == "/settings" ? "default" : "outline"} as="li" asChild>
            <Link href="/settings">Settings</Link>
          </Button>
        </menu>
        <UserButton />
      </nav>
    </div>
  )
}
