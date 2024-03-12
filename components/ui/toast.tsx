"use client"

import { type FC } from "react"
import { Toaster, ToasterProps } from "react-hot-toast"

type Props = {}

export const ToastHot: FC<ToasterProps> = props => {
  return (
    <Toaster
      toastOptions={{
        style: {
          border: "3px solid hsl(var(--border))",
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
        },
      }}
    />
  )
}
