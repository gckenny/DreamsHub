import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

// ----------------------------------------------------------------------------
// Generic DataTable with RWD support
// Desktop: Traditional table layout
// Mobile: Card-based layout
// ----------------------------------------------------------------------------

export interface Column<T> {
  key: keyof T | string;
  header: string;
  // Render function for custom cell content
  render?: (item: T, index: number) => React.ReactNode;
  // For simple cases, just access the key
  accessor?: (item: T) => React.ReactNode;
  // Responsive visibility
  hideOnMobile?: boolean;
  // Alignment
  align?: "left" | "center" | "right";
  // Width
  width?: string;
  // Mobile: show as primary (title) or secondary (subtitle)
  mobileRole?: "title" | "subtitle" | "badge" | "hidden";
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T, index: number) => string;
  // Empty state
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  // Loading state
  isLoading?: boolean;
  loadingRows?: number;
  // Row click handler
  onRowClick?: (item: T) => void;
  // Custom row class
  rowClassName?: (item: T, index: number) => string;
  // Container class
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = "沒有資料",
  emptyIcon,
  isLoading = false,
  loadingRows = 5,
  onRowClick,
  rowClassName,
  className,
}: DataTableProps<T>) {
  // Get cell value
  const getCellValue = (item: T, column: Column<T>): React.ReactNode => {
    if (column.render) {
      return column.render(item, data.indexOf(item));
    }
    if (column.accessor) {
      return column.accessor(item);
    }
    const key = column.key as keyof T;
    const value = item[key];
    return value as React.ReactNode;
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {/* Mobile skeleton */}
        <div className="md:hidden space-y-3">
          {Array.from({ length: loadingRows }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Desktop skeleton */}
        <div className="hidden md:block">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-3">
              <div className="h-4 bg-muted rounded w-full" />
            </div>
            {Array.from({ length: loadingRows }).map((_, i) => (
              <div key={i} className="p-3 border-t animate-pulse">
                <div className="h-4 bg-muted rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center py-12 text-muted-foreground",
          className
        )}
      >
        {emptyIcon && <div className="mb-4 text-4xl">{emptyIcon}</div>}
        <p>{emptyMessage}</p>
      </div>
    );
  }

  // Get columns for mobile display
  const titleColumn = columns.find((c) => c.mobileRole === "title") || columns[0];
  const subtitleColumn = columns.find((c) => c.mobileRole === "subtitle");
  const badgeColumn = columns.find((c) => c.mobileRole === "badge");
  const visibleMobileColumns = columns.filter(
    (c) => c.mobileRole !== "hidden" && c !== titleColumn && c !== subtitleColumn && c !== badgeColumn
  );

  return (
    <div className={className}>
      {/* Mobile: Card-based layout */}
      <div className="md:hidden space-y-3">
        {data.map((item, index) => (
          <Card
            key={keyExtractor(item, index)}
            className={cn(
              onRowClick && "cursor-pointer hover:bg-accent/50 transition-colors",
              rowClassName?.(item, index)
            )}
            onClick={() => onRowClick?.(item)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">
                    {getCellValue(item, titleColumn)}
                  </div>
                  {subtitleColumn && (
                    <div className="text-sm text-muted-foreground truncate">
                      {getCellValue(item, subtitleColumn)}
                    </div>
                  )}
                </div>
                {badgeColumn && (
                  <div className="flex-shrink-0">
                    {getCellValue(item, badgeColumn)}
                  </div>
                )}
              </div>
              {visibleMobileColumns.length > 0 && (
                <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-2 text-sm">
                  {visibleMobileColumns.slice(0, 4).map((column) => (
                    <div key={String(column.key)}>
                      <span className="text-muted-foreground">
                        {column.header}:
                      </span>{" "}
                      {getCellValue(item, column)}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop: Table layout */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {columns
                .filter((c) => !c.hideOnMobile || true) // Show all on desktop
                .map((column) => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium text-muted-foreground",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                      !column.align && "text-left"
                    )}
                    style={{ width: column.width }}
                  >
                    {column.header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((item, index) => (
              <tr
                key={keyExtractor(item, index)}
                className={cn(
                  onRowClick &&
                    "cursor-pointer hover:bg-accent/50 transition-colors",
                  rowClassName?.(item, index)
                )}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={cn(
                      "px-4 py-3 text-sm",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right"
                    )}
                  >
                    {getCellValue(item, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
