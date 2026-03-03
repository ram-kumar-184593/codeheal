import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        `
        flex h-10 w-full items-center justify-between

        rounded-xl

        border border-white/10

        bg-white/5 backdrop-blur-xl

        px-4 py-2

        text-sm text-white

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
    >
      {children}

      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 text-white/40" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  ),
);

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        "flex items-center justify-center py-1 text-white/60",
        className,
      )}
      {...props}
    >
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  ),
);

SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
        "flex items-center justify-center py-1 text-white/60",
        className,
      )}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  ),
);

SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        className={cn(
          `
          z-50

          max-h-96
          min-w-[10rem]

          overflow-hidden

          rounded-xl

          border border-white/10

          bg-white/5 backdrop-blur-xl

          text-white

          shadow-xl shadow-black/30

          animate-in fade-in zoom-in-95
          `,
          className,
        )}
        {...props}
      >
        <SelectScrollUpButton />

        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>

        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);

SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-2 px-3 text-xs font-semibold text-white/40", className)}
    {...props}
  />
));

SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        `
        relative

        flex items-center

        rounded-md

        py-2 pl-8 pr-3

        text-sm text-white/80

        cursor-pointer

        outline-none

        hover:bg-white/10
        hover:text-white

        transition

        data-[disabled]:pointer-events-none
        data-[disabled]:opacity-40
        `,
        className,
      )}
      {...props}
    >
      <span className="absolute left-2">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4 text-indigo-400" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  ),
);

SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-white/10", className)}
    {...props}
  />
));

SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
