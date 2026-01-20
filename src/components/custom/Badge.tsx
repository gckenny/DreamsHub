/**
 * Badge Wrapper
 * 包裝 shadcn/ui Badge，加入游泳賽事系統常用的狀態標籤
 */
import { Badge as ShadcnBadge, badgeVariants, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Re-export base Badge
export const Badge = ShadcnBadge;
export { badgeVariants };
export type { BadgeProps };

/**
 * StatusBadge - 狀態標籤 (比賽狀態、報名狀態等)
 */
export type StatusType =
  | "registration"
  | "upcoming"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "pending"
  | "confirmed"
  | "dns"
  | "dnf"
  | "dq";

const statusConfig: Record<
  StatusType,
  { label: string; className: string }
> = {
  // 比賽狀態
  registration: {
    label: "報名中",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  upcoming: {
    label: "即將開始",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  in_progress: {
    label: "進行中",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  completed: {
    label: "已結束",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  },
  cancelled: {
    label: "已取消",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  // 報名/成績狀態
  pending: {
    label: "待確認",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  confirmed: {
    label: "已確認",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  dns: {
    label: "未出賽",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  },
  dnf: {
    label: "未完賽",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  dq: {
    label: "犯規",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  status: StatusType;
  /** 自訂標籤文字 (覆蓋預設) */
  label?: string;
}

export function StatusBadge({
  status,
  label,
  className,
  ...props
}: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <ShadcnBadge
      variant="outline"
      className={cn(config.className, className)}
      {...props}
    >
      {label ?? config.label}
    </ShadcnBadge>
  );
}

/**
 * PoolTypeBadge - 泳池規格標籤
 */
export interface PoolTypeBadgeProps extends Omit<BadgeProps, "variant" | "children"> {
  poolType: "25m" | "50m";
}

export function PoolTypeBadge({ poolType, className, ...props }: PoolTypeBadgeProps) {
  return (
    <ShadcnBadge
      variant="secondary"
      className={cn("font-mono", className)}
      {...props}
    >
      {poolType}
    </ShadcnBadge>
  );
}
