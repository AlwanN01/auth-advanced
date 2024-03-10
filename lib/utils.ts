import { type MutableRefObject, type RefCallback } from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type MutableRefList<T> = Array<RefCallback<T> | MutableRefObject<T> | undefined | null>

export function mergeRefs<T>(...refs: MutableRefList<T>): RefCallback<T> {
  return (val: T) => {
    setRef(val, ...refs)
  }
}

export function setRef<T>(val: T, ...refs: MutableRefList<T>): void {
  refs.forEach(ref => {
    if (typeof ref === "function") {
      ref(val)
    } else if (ref != null) {
      ref.current = val
    }
  })
}
type ToTitleCase__<S extends string> = S extends `${infer T}${infer K}${infer U}`
  ? `${T extends "-" | "_" ? " " : T}${T extends Capitalize<T> ? "" : K extends Capitalize<Exclude<K, "-" | "_" | " ">> ? " " : ""}${ToTitleCase__<`${K}${U}`>}`
  : S

type ToTitleCase<S extends string> =
  ToTitleCase__<S> extends `${infer A} ${infer B}`
    ? `${Capitalize<Lowercase<A>>} ${ToTitleCase<B>}`
    : Capitalize<Lowercase<S>>

export const toTitleCase = <S extends string>(str: S) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1 $2") //camelCase to word
    .replace(/[_-]/g, " ") // snake_case and kebab-case to word
    .replace(
      /\w\S*/g,
      txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    ) as ToTitleCase<S>
