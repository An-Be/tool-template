import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> };

// 16px text on mobile so iOS Safari doesn't zoom on focus.
export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full border border-ink bg-paper px-3 font-mono text-base text-ink placeholder:text-faint sm:text-sm",
        "disabled:bg-wash disabled:text-mute aria-invalid:border-2",
        className,
      )}
      {...props}
    />
  );
}
