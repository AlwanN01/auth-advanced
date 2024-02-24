import { NextResponse } from "next/server"
import authConfig from "@/auth.config"
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/routes"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  console.log("ROUTE        : ", nextUrl.pathname)
  console.log("IS LOGGED IN : ", isLoggedIn)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return NextResponse.next() //api/auth/providers(|google|github|credentials)
  if (isAuthRoute) {
    return isLoggedIn
      ? NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin))
      : NextResponse.next()
  }
  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(authRoutes[0], nextUrl.origin))
  }
  return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
