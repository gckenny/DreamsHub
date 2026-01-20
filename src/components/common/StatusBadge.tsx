import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------------
// StatusBadge - Reusable status indicator with variants
// ----------------------------------------------------------------------------

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
        warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
        error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
        info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
        neutral: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

export function StatusBadge({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
}

// ----------------------------------------------------------------------------
// Pre-configured status badges for common use cases
// ----------------------------------------------------------------------------

// Competition Status
export type CompetitionStatusVariant =
  | "DRAFT"
  | "PUBLISHED"
  | "REGISTRATION_OPEN"
  | "REGISTRATION_CLOSED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

const competitionStatusConfig: Record<
  CompetitionStatusVariant,
  { label: string; variant: VariantProps<typeof badgeVariants>["variant"] }
> = {
  DRAFT: { label: "草稿", variant: "neutral" },
  PUBLISHED: { label: "已發布", variant: "info" },
  REGISTRATION_OPEN: { label: "報名中", variant: "success" },
  REGISTRATION_CLOSED: { label: "報名截止", variant: "warning" },
  IN_PROGRESS: { label: "進行中", variant: "info" },
  COMPLETED: { label: "已結束", variant: "neutral" },
  CANCELLED: { label: "已取消", variant: "error" },
};

export function CompetitionStatusBadge({
  status,
  ...props
}: { status: CompetitionStatusVariant } & Omit<StatusBadgeProps, "variant" | "children">) {
  const config = competitionStatusConfig[status];
  return (
    <StatusBadge variant={config.variant} {...props}>
      {config.label}
    </StatusBadge>
  );
}

// Entry Status
export type EntryStatusVariant =
  | "PENDING"
  | "CONFIRMED"
  | "CHECKED_IN"
  | "SCRATCHED"
  | "NO_SHOW"
  | "CANCELLED";

const entryStatusConfig: Record<
  EntryStatusVariant,
  { label: string; variant: VariantProps<typeof badgeVariants>["variant"] }
> = {
  PENDING: { label: "待付款", variant: "warning" },
  CONFIRMED: { label: "已確認", variant: "success" },
  CHECKED_IN: { label: "已報到", variant: "info" },
  SCRATCHED: { label: "已退賽", variant: "neutral" },
  NO_SHOW: { label: "未出席", variant: "error" },
  CANCELLED: { label: "已取消", variant: "neutral" },
};

export function EntryStatusBadge({
  status,
  ...props
}: { status: EntryStatusVariant } & Omit<StatusBadgeProps, "variant" | "children">) {
  const config = entryStatusConfig[status];
  return (
    <StatusBadge variant={config.variant} {...props}>
      {config.label}
    </StatusBadge>
  );
}

// Result Status
export type ResultStatusVariant = "OK" | "DQ" | "DNS" | "DNF" | "DSQ";

const resultStatusConfig: Record<
  ResultStatusVariant,
  { label: string; variant: VariantProps<typeof badgeVariants>["variant"] }
> = {
  OK: { label: "完成", variant: "success" },
  DQ: { label: "犯規", variant: "error" },
  DNS: { label: "未出發", variant: "neutral" },
  DNF: { label: "未完成", variant: "warning" },
  DSQ: { label: "取消資格", variant: "error" },
};

export function ResultStatusBadge({
  status,
  ...props
}: { status: ResultStatusVariant } & Omit<StatusBadgeProps, "variant" | "children">) {
  const config = resultStatusConfig[status];
  return (
    <StatusBadge variant={config.variant} {...props}>
      {config.label}
    </StatusBadge>
  );
}

// Payment Status
export type PaymentStatusVariant =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

const paymentStatusConfig: Record<
  PaymentStatusVariant,
  { label: string; variant: VariantProps<typeof badgeVariants>["variant"] }
> = {
  PENDING: { label: "待付款", variant: "warning" },
  PROCESSING: { label: "處理中", variant: "info" },
  COMPLETED: { label: "已完成", variant: "success" },
  FAILED: { label: "失敗", variant: "error" },
  REFUNDED: { label: "已退款", variant: "neutral" },
  CANCELLED: { label: "已取消", variant: "neutral" },
};

export function PaymentStatusBadge({
  status,
  ...props
}: { status: PaymentStatusVariant } & Omit<StatusBadgeProps, "variant" | "children">) {
  const config = paymentStatusConfig[status];
  return (
    <StatusBadge variant={config.variant} {...props}>
      {config.label}
    </StatusBadge>
  );
}
