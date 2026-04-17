import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border px-3 py-2 text-sm transition-colors",
          "border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400",
          "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-green-500/25 focus-visible:border-green-400",
          "dark:focus-visible:border-green-500 dark:focus-visible:ring-green-500/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
