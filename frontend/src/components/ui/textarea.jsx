import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        `
          flex
          min-h-[100px]
          w-full

          rounded-xl

          border border-white/10

          bg-white/5 backdrop-blur-xl

          px-4 py-3

          text-sm
          text-white

          placeholder:text-white/40

          outline-none

          transition-all duration-200

          focus:border-indigo-500/50
          focus:ring-2
          focus:ring-indigo-500/20

          disabled:cursor-not-allowed
          disabled:opacity-50
          `,
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
