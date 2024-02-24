"use client"

//#region Imports
import type { FC } from "react"
import { Suspense } from "react"

//#endregion Imports
type Props = { children: React.ReactNode; fallback?: React.ReactNode }

export const SuspenseWrapper: FC<Props> = ({ children, fallback }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>
}
