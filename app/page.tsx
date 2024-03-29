import Link from "next/link"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import LoginButton from "@/components/auth/login-button"

import { poppins } from "@/fonts/poppins"

export default function Home() {
  return (
    <main className="bg-gradient-primary flex h-full flex-col items-center justify-center from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn("font text-6xl font-semibold text-white drop-shadow-md", poppins.className)}
        >
          🔐Auth
        </h1>
        <p className="text-lg text-white">A simple authentication service</p>
      </div>
      <div className="mt-2">
        <LoginButton mode="modal" asChild>
          <Button variant="secondary" size="lg">
            Login
          </Button>
        </LoginButton>
      </div>
    </main>
  )
}
