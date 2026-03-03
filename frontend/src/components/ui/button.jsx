import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
  inline-flex items-center justify-center gap-2 whitespace-nowrap
  rounded-md text-sm font-medium

  transition-all duration-200

  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-indigo-500/40

  disabled:pointer-events-none
  disabled:opacity-50

  [&_svg]:pointer-events-none
  [&_svg]:size-4
  [&_svg]:shrink-0
  `,

  {
    variants: {
      variant: {
        default: `
          bg-gradient-to-r
          from-indigo-500 to-purple-500
          text-white
          hover:opacity-90
          shadow-lg shadow-indigo-500/20
        `,

        destructive: `
          bg-red-500/90
          text-white
          hover:bg-red-500
          shadow-lg shadow-red-500/20
        `,

        outline: `
          border border-white/10
          bg-white/5 backdrop-blur-xl
          text-white
          hover:bg-white/10
        `,

        secondary: `
          bg-white/10
          text-white
          hover:bg-white/20
        `,

        ghost: `
          text-white/70
          hover:bg-white/10
          hover:text-white
        `,

        link: `
          text-indigo-400
          hover:text-indigo-300
          underline-offset-4
          hover:underline
        `,
      },

      size: {
        default: "h-10 px-4 py-2",

        sm: "h-9 px-3",

        lg: "h-11 px-8",

        icon: "h-10 w-10",
      },
    },

    defaultVariants: {
      variant: "default",

      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
