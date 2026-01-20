import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------------
// PageLayout - Main content wrapper with responsive padding
// ----------------------------------------------------------------------------

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  // Max width constraint
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export function PageLayout({
  children,
  className,
  maxWidth = "xl",
}: PageLayoutProps) {
  return (
    <main
      className={cn(
        "min-h-screen",
        "px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8",
        "mx-auto",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </main>
  );
}

// ----------------------------------------------------------------------------
// PageHeader - Page title with optional actions
// ----------------------------------------------------------------------------

interface PageHeaderProps {
  title: string;
  description?: string;
  // Back button
  showBack?: boolean;
  backTo?: string;
  onBack?: () => void;
  // Actions (buttons on the right)
  actions?: React.ReactNode;
  // Breadcrumb
  breadcrumb?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  showBack,
  backTo,
  onBack,
  actions,
  breadcrumb,
  className,
}: PageHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={cn("mb-6 sm:mb-8", className)}>
      {breadcrumb && <div className="mb-2">{breadcrumb}</div>}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="shrink-0 -ml-2"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">返回</span>
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex items-center gap-2 flex-wrap">{actions}</div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// PageSection - Section within a page
// ----------------------------------------------------------------------------

interface PageSectionProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function PageSection({
  title,
  description,
  actions,
  children,
  className,
}: PageSectionProps) {
  return (
    <section className={cn("mb-6 sm:mb-8", className)}>
      {(title || actions) && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
          {title && (
            <div>
              <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}
          {actions && (
            <div className="flex items-center gap-2 flex-wrap">{actions}</div>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

// ----------------------------------------------------------------------------
// ResponsiveGrid - Grid that adapts to screen size
// ----------------------------------------------------------------------------

interface ResponsiveGridProps {
  children: React.ReactNode;
  // Columns at each breakpoint
  cols?: {
    default?: 1 | 2 | 3 | 4;
    sm?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4;
    lg?: 1 | 2 | 3 | 4;
  };
  gap?: "sm" | "md" | "lg";
  className?: string;
}

const colClasses = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const gapClasses = {
  sm: "gap-2 sm:gap-3",
  md: "gap-3 sm:gap-4 lg:gap-6",
  lg: "gap-4 sm:gap-6 lg:gap-8",
};

export function ResponsiveGrid({
  children,
  cols = { default: 1, sm: 2, lg: 3 },
  gap = "md",
  className,
}: ResponsiveGridProps) {
  const gridClasses = cn(
    "grid",
    cols.default && colClasses[cols.default],
    cols.sm && `sm:${colClasses[cols.sm]}`,
    cols.md && `md:${colClasses[cols.md]}`,
    cols.lg && `lg:${colClasses[cols.lg]}`,
    gapClasses[gap],
    className
  );

  return <div className={gridClasses}>{children}</div>;
}

// ----------------------------------------------------------------------------
// MobileBottomActions - Fixed bottom action bar for mobile
// ----------------------------------------------------------------------------

interface MobileBottomActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileBottomActions({
  children,
  className,
}: MobileBottomActionsProps) {
  return (
    <>
      {/* Spacer to prevent content from being hidden behind the fixed bar */}
      <div className="h-20 md:hidden" />
      {/* Fixed bottom bar */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40",
          "bg-background border-t",
          "p-4 flex items-center gap-3",
          "md:hidden",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
