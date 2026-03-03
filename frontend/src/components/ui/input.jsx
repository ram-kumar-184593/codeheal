import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        `
          flex h-10 w-full rounded-md

          border border-white/10
          bg-white/5 backdrop-blur-xl

          px-3 py-2 text-sm
          text-white

          placeholder:text-white/40

          outline-none

          focus:border-indigo-500/40
          focus:ring-2
          focus:ring-indigo-500/20

          disabled:cursor-not-allowed
          disabled:opacity-50

          transition-all duration-200
          `,

        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
