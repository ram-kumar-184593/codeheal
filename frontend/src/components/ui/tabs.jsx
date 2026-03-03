import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/* Root */
const Tabs = TabsPrimitive.Root;

/* Tabs List */
const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      `
      inline-flex h-11 items-center justify-center
      rounded-xl
      bg-white/5 backdrop-blur-xl
      border border-white/10
      p-1
      text-white/60
      shadow-lg
      `,
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/* Tabs Trigger */
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      `
      inline-flex items-center justify-center whitespace-nowrap
      rounded-lg px-4 py-1.5
      text-sm font-medium
      text-white/60
      transition-all duration-200

      hover:text-white
      hover:bg-white/10

      data-[state=active]:bg-gradient-to-r
      data-[state=active]:from-indigo-500/30
      data-[state=active]:to-purple-500/30
      data-[state=active]:text-white
      data-[state=active]:shadow-md
      data-[state=active]:border
      data-[state=active]:border-indigo-400/30

      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-indigo-500/50

      disabled:pointer-events-none
      disabled:opacity-50
      `,
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/* Tabs Content */
const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      `
      mt-4
      outline-none
      `,
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
