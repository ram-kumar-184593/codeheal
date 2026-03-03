import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

const SidebarProvider = React.forwardRef(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;

    const setOpen = React.useCallback(
      (value) => {
        const openState = typeof value === "function" ? value(open) : value;

        if (setOpenProp) setOpenProp(openState);
        else _setOpen(openState);

        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open],
    );

    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, setOpen]);

    React.useEffect(() => {
      const handleKeyDown = (event) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={{
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            }}
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full",
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  },
);

SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            side={side}
            className="
              w-[--sidebar-width]
              bg-white/5 backdrop-blur-xl
              border-r border-white/10
              text-white
              p-0
            "
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="group peer hidden md:block"
        data-state={state}
        data-side={side}
      >
        <div
          className={cn(
            "fixed inset-y-0 z-10 hidden md:flex",
            "w-[--sidebar-width]",
            "bg-white/5 backdrop-blur-xl",
            "border-r border-white/10",
            "text-white",
            "shadow-xl",
            className,
          )}
          {...props}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </div>
      </div>
    );
  },
);

Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8 text-white hover:bg-white/10", className)}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <PanelLeft />
      </Button>
    );
  },
);

SidebarTrigger.displayName = "SidebarTrigger";

const SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <Separator ref={ref} className={cn("bg-white/10", className)} {...props} />
));

SidebarSeparator.displayName = "SidebarSeparator";

const SidebarInput = React.forwardRef(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn(
      "bg-white/5 border-white/10 text-white placeholder:text-white/40",
      className,
    )}
    {...props}
  />
));

SidebarInput.displayName = "SidebarInput";

const sidebarMenuButtonVariants = cva(
  `
  flex items-center gap-2 rounded-md p-2 text-sm
  text-white/70 hover:text-white
  hover:bg-white/10
  data-[active=true]:bg-indigo-500/20
  transition-colors
`,
);

const SidebarMenuButton = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(sidebarMenuButtonVariants(), className)}
    {...props}
  />
));

SidebarMenuButton.displayName = "SidebarMenuButton";

export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarSeparator,
  SidebarInput,
  SidebarMenuButton,
  useSidebar,
};
