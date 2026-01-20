/**
 * Input Wrapper
 * 包裝 shadcn/ui Input，加入常用功能
 */
import * as React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

// Re-export base Input
export const Input = ShadcnInput;

/**
 * FormField - 帶標籤的輸入欄位
 */
export interface FormFieldProps
  extends React.ComponentPropsWithoutRef<typeof ShadcnInput> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, hint, required, id, className, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <div className="space-y-2">
        <Label htmlFor={inputId} className="flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
        <ShadcnInput
          ref={ref}
          id={inputId}
          className={cn(error && "border-red-500 focus-visible:ring-red-500", className)}
          {...props}
        />
        {hint && !error && (
          <p className="text-sm text-muted-foreground">{hint}</p>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
FormField.displayName = "FormField";

/**
 * SearchInput - 搜尋輸入框
 */
export interface SearchInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ShadcnInput>, "type"> {
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    const hasValue = value && String(value).length > 0;
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <ShadcnInput
          ref={ref}
          type="search"
          className={cn("pl-9 pr-9", className)}
          value={value}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

/**
 * TimeInput - 游泳成績時間輸入 (MM:SS.ss)
 */
export interface TimeInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ShadcnInput>, "type"> {
  /** 格式化後的時間值 */
  onTimeChange?: (timeMs: number | null) => void;
}

export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, onChange, onTimeChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);

      // Parse time string to milliseconds
      if (onTimeChange) {
        const value = e.target.value;
        const match = value.match(/^(\d{1,2}):(\d{2})\.(\d{2})$/);
        if (match) {
          const [, min, sec, ms] = match;
          const totalMs =
            parseInt(min) * 60000 + parseInt(sec) * 1000 + parseInt(ms) * 10;
          onTimeChange(totalMs);
        } else {
          onTimeChange(null);
        }
      }
    };

    return (
      <ShadcnInput
        ref={ref}
        type="text"
        placeholder="00:00.00"
        className={cn("font-mono", className)}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
TimeInput.displayName = "TimeInput";
