/**
 * Card Wrapper
 * 包裝 shadcn/ui Card，方便未來升級與客製化
 */
import * as React from "react";
import {
  Card as ShadcnCard,
  CardHeader as ShadcnCardHeader,
  CardFooter as ShadcnCardFooter,
  CardTitle as ShadcnCardTitle,
  CardDescription as ShadcnCardDescription,
  CardContent as ShadcnCardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Re-export with same interface for easy migration
export const Card = ShadcnCard;
export const CardHeader = ShadcnCardHeader;
export const CardFooter = ShadcnCardFooter;
export const CardTitle = ShadcnCardTitle;
export const CardDescription = ShadcnCardDescription;
export const CardContent = ShadcnCardContent;

/**
 * ClickableCard - 可點擊的卡片 (hover 效果)
 */
export interface ClickableCardProps
  extends React.ComponentPropsWithoutRef<typeof ShadcnCard> {
  onClick?: () => void;
}

export const ClickableCard = React.forwardRef<
  HTMLDivElement,
  ClickableCardProps
>(({ className, onClick, ...props }, ref) => {
  return (
    <ShadcnCard
      ref={ref}
      className={cn(
        "cursor-pointer transition-shadow hover:shadow-md",
        className
      )}
      onClick={onClick}
      {...props}
    />
  );
});
ClickableCard.displayName = "ClickableCard";
