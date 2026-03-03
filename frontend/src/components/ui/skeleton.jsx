import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        `
        animate-pulse

        rounded-xl

        bg-gradient-to-r
        from-white/5
        via-white/10
        to-white/5

        backdrop-blur-xl

        border border-white/10
        `,
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
