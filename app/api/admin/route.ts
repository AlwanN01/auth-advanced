import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"

export async function GET() {
  const user = await auth()
  if (user?.role !== "ADMIN") {
    return new NextResponse(null, { status: 403 })
  }
  return new NextResponse(null, { status: 200 })
}
