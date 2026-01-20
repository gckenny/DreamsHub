/**
 * Button Wrapper
 * 包裝 shadcn/ui Button，方便未來升級與客製化
 *
 * 使用方式：
 * import { Button, ButtonLink } from "@/components/custom/Button";
 */
import * as React from "react";
import {
  Button as ShadcnButton,
  buttonVariants,
  type ButtonProps as ShadcnButtonProps,
} from "@/components/ui/button";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ShadcnButtonProps {
  /** 顯示 loading 狀態 */
  loading?: boolean;
}

/**
 * Button - 基礎按鈕
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, disabled, children, ...props }, ref) => {
    return (
      <ShadcnButton ref={ref} disabled={loading || disabled} {...props}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </ShadcnButton>
    );
  }
);
Button.displayName = "Button";

/**
 * ButtonLink - 連結樣式的按鈕 (使用 React Router)
 */
export interface ButtonLinkProps
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  variant?: ShadcnButtonProps["variant"];
  size?: ShadcnButtonProps["size"];
}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
ButtonLink.displayName = "ButtonLink";

export { buttonVariants };
