import { forwardRef, type FC } from "react"
import { OTPInput, SlotProps } from "input-otp"
import { ControllerRenderProps } from "react-hook-form"

import { cn } from "@/lib/utils"

//#endregion Imports
// type Props = { value: string; onChange: (value: string) => void }
type Props = ControllerRenderProps & {
  disabled?: boolean
  onComplete?: ((...args: any[]) => unknown) | undefined
}

export const OtpCodeInput = forwardRef<HTMLInputElement, Props>((Props, ref) => {
  return (
    <OTPInput
      maxLength={6}
      containerClassName="mx-auto group flex items-center justify-center has-[:disabled]:opacity-30"
      render={({ slots }) => (
        <>
          <div className="flex">
            {slots.slice(0, 3).map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>

          <FakeDash />

          <div className="flex">
            {slots.slice(3).map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        </>
      )}
      {...Props}
    />
  )
})
OtpCodeInput.displayName = "OtpCodeInput"
function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative h-14 w-10 text-[2rem]",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border-y border-r border-border first:rounded-l-md first:border-l last:rounded-r-md",
        "group-focus-within:border-accent-foreground/20 group-hover:border-accent-foreground/20",
        "outline outline-0 outline-accent-foreground/20",
        { "outline-4 outline-accent-foreground": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  )
}
function FakeCaret() {
  return (
    <div className="pointer-events-none absolute inset-0 flex animate-caret-blink items-center justify-center">
      <div className="h-8 w-px bg-white" />
    </div>
  )
}

function FakeDash() {
  return (
    <div className="flex w-10 items-center justify-center">
      <div className="h-1 w-3 rounded-full bg-border" />
    </div>
  )
}
