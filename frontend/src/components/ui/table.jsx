import * as React from "react";
import { cn } from "@/lib/utils";

/* Table Wrapper */
const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div
    className="
      relative w-full overflow-auto
      rounded-xl
      border border-white/10
      bg-white/5 backdrop-blur-xl
      shadow-xl
    "
  >
    <table
      ref={ref}
      className={cn(
        `
        w-full caption-bottom text-sm
        text-white/80
        `,
        className,
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

/* Header */
const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      `
      [&_tr]:border-b
      [&_tr]:border-white/10
      `,
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

/* Body */
const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      `
      [&_tr:last-child]:border-0
      `,
      className,
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/* Footer */
const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      `
      border-t border-white/10
      bg-white/5
      font-medium
      [&>tr]:last:border-b-0
      `,
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/* Row */
const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      `
      border-b border-white/5
      transition-all duration-200

      hover:bg-white/5
      data-[state=selected]:bg-indigo-500/10
      `,
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

/* Head Cell */
const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      `
      h-12 px-4 text-left align-middle
      font-semibold

      text-white/60

      [&:has([role=checkbox])]:pr-0
      `,
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/* Body Cell */
const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      `
      p-4 align-middle
      text-white/80

      [&:has([role=checkbox])]:pr-0
      `,
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/* Caption */
const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      `
      mt-4 text-sm
      text-white/40
      `,
      className,
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
