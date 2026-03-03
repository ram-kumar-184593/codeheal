import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        `
        flex items-center

        cursor-pointer
        select-none

        rounded-md

        px-3 py-2

        text-sm

        text-white/80

        outline-none

        hover:bg-white/10
        hover:text-white

        transition
        `,
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      {children}

      <ChevronRight className="ml-auto h-4 w-4 text-white/40" />
    </DropdownMenuPrimitive.SubTrigger>
  ),
);

DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        `
        z-50

        min-w-[10rem]

        overflow-hidden

        rounded-xl

        border border-white/10

        bg-white/5 backdrop-blur-xl

        p-1

        text-white

        shadow-xl shadow-black/30

        animate-in fade-in zoom-in-95
        `,
        className,
      )}
      {...props}
    />
  ),
);

DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef(
  ({ className, sideOffset = 6, ...props }, ref) => (
    <DropdownMenuPortal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          `
          z-50

          min-w-[12rem]

          overflow-hidden

          rounded-xl

          border border-white/10

          bg-white/5 backdrop-blur-xl

          p-1

          text-white

          shadow-xl shadow-black/30

          animate-in fade-in zoom-in-95
          `,
          className,
        )}
        {...props}
      />
    </DropdownMenuPortal>
  ),
);

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        `
        relative

        flex items-center

        cursor-pointer
        select-none

        rounded-md

        px-3 py-2

        text-sm

        text-white/80

        outline-none

        hover:bg-white/10
        hover:text-white

        transition

        data-[disabled]:pointer-events-none
        data-[disabled]:opacity-40
        `,
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  ),
);

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(
        `
        relative

        flex items-center

        cursor-pointer
        select-none

        rounded-md

        py-2 pl-8 pr-3

        text-sm

        text-white/80

        outline-none

        hover:bg-white/10
        hover:text-white

        transition
        `,
        className,
      )}
      {...props}
    >
      <span className="absolute left-2">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4 text-indigo-400" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  ),
);

DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        `
        relative

        flex items-center

        cursor-pointer
        select-none

        rounded-md

        py-2 pl-8 pr-3

        text-sm

        text-white/80

        outline-none

        hover:bg-white/10
        hover:text-white

        transition
        `,
        className,
      )}
      {...props}
    >
      <span className="absolute left-2">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-indigo-400 text-indigo-400" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>

      {children}
    </DropdownMenuPrimitive.RadioItem>
  ),
);

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        `
        px-3 py-2

        text-xs

        font-semibold

        text-white/40
        `,
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  ),
);

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn("my-1 h-px bg-white/10", className)}
      {...props}
    />
  ),
);

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }) => (
  <span className={cn("ml-auto text-xs text-white/40", className)} {...props} />
);

DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
