import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-full border border-white/20 bg-white/5 px-5 text-sm text-white placeholder:text-white/50 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
