import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";

// ----------------------------------------------------------------------------
// EmptyState - Reusable empty state component
// ----------------------------------------------------------------------------

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
    >
      <div className="rounded-full bg-muted p-4 mb-4">
        {icon || <InboxIcon className="h-8 w-8 text-muted-foreground" />}
      </div>
      <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-4">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Pre-configured empty states
// ----------------------------------------------------------------------------

export function NoDataEmptyState({
  entityName = "資料",
  onAdd,
}: {
  entityName?: string;
  onAdd?: () => void;
}) {
  return (
    <EmptyState
      title={`沒有${entityName}`}
      description={onAdd ? `點擊下方按鈕新增${entityName}` : undefined}
      action={onAdd ? { label: `新增${entityName}`, onClick: onAdd } : undefined}
    />
  );
}

export function NoSearchResultsEmptyState({
  searchTerm,
  onClear,
}: {
  searchTerm?: string;
  onClear?: () => void;
}) {
  return (
    <EmptyState
      title="找不到結果"
      description={
        searchTerm
          ? `沒有符合「${searchTerm}」的結果，請嘗試其他關鍵字`
          : "沒有符合條件的結果，請調整篩選條件"
      }
      action={onClear ? { label: "清除篩選", onClick: onClear } : undefined}
    />
  );
}

export function ErrorEmptyState({
  message = "載入資料時發生錯誤",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      title="發生錯誤"
      description={message}
      action={onRetry ? { label: "重試", onClick: onRetry } : undefined}
    />
  );
}
