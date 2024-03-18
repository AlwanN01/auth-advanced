"use client"

import { forwardRef, useEffect, useRef } from "react"
import { Route } from "next"
import { usePathname, useRouter } from "next/navigation"

import { mergeRefs } from "@/lib/utils"
import { useIntersectionObserver } from "@/hooks/use-intersection"

type Props = Omit<React.ComponentProps<"a">, "ref"> & {
  href: Route
  prefetch?: boolean
  prerender?: boolean
}

export const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ href, children, prefetch = true, prerender, ...props }, ref) => {
    const linkRef = useRef<HTMLAnchorElement>(null)
    const entry = useIntersectionObserver(linkRef, { freezeOnceVisible: true })
    const router = useRouter()
    const pathname = usePathname()

    const isPrefetchTimeout = useRef(false)
    const timer = useRef<NodeJS.Timeout | undefined>(undefined)
    if (prefetch && entry?.isIntersecting) {
      setTimeout(() => router.prefetch(href), 300)
    }
    useEffect(() => {
      timer.current = setTimeout(() => {
        isPrefetchTimeout.current = true
      }, 1000 * 30)
      return () => clearTimeout(timer.current)
    }, [])
    return (
      <a
        {...props}
        ref={mergeRefs(linkRef, ref)}
        href={href}
        onClick={e => {
          e.preventDefault()
          if (pathname === href) return
          router.push(href)
          if (isPrefetchTimeout.current) {
            prerender ? router.refresh() : setTimeout(() => router.refresh(), 100)
            isPrefetchTimeout.current = false
          }
          clearTimeout(timer.current)
          timer.current = setTimeout(() => {
            isPrefetchTimeout.current = true
          }, 1000 * 30)
        }}
        onMouseOver={e => {
          e.preventDefault()
          router.prefetch(href)
        }}
      >
        {children}
      </a>
    )
  }
)

Link.displayName = "Dynamic Link"
