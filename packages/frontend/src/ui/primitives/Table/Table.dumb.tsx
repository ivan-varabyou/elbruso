import { cn } from "@frontend/lib";
import { ReactNode } from "react";

export interface TableProps {
  children: ReactNode;
  className?: string;
}

export interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface TableHeadProps {
  children: ReactNode;
  className?: string;
}

export interface TableCellProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full border-collapse", className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return <thead className={cn("bg-zinc-50/50", className)}>{children}</thead>;
}

export function TableBody({ children, className }: TableBodyProps) {
  return <tbody className={cn("divide-y divide-zinc-100", className)}>{children}</tbody>;
}

export function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-zinc-100 transition-colors",
        onClick && "cursor-pointer hover:bg-zinc-50/50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className }: TableHeadProps) {
  return (
    <th
      className={cn(
        "px-6 py-3 text-left text-xs font-black uppercase tracking-widest text-zinc-500",
        className
      )}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className, colSpan }: TableCellProps) {
  return (
    <td className={cn("px-6 py-4 text-sm text-zinc-900", className)} colSpan={colSpan}>
      {children}
    </td>
  );
}
