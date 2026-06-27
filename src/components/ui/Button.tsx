"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-gradient-brand text-white hover:bg-gradient-brand-hover shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 active:shadow-brand-500/20",
  secondary:
    "bg-surface-elevated text-text-primary border border-border hover:bg-surface-100 dark:hover:bg-surface-800 shadow-sm",
  ghost:
    "text-text-primary hover:bg-surface-100 dark:hover:bg-surface-800",
  gradient:
    "bg-gradient-brand text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 active:shadow-brand-500/20 animate-gradient-move bg-[length:200%_200%]",
  glass:
    "glass text-text-primary hover:bg-white/20 dark:hover:bg-white/10 shadow-glass",
  danger:
    "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25",
  outline:
    "border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white transition-all",
};

const sizes = {
  xs: "px-2.5 py-1.5 text-xs rounded-lg",
  sm: "px-3 py-2 text-sm rounded-xl",
  md: "px-4 py-2.5 text-sm rounded-xl",
  lg: "px-5 py-3 text-base rounded-2xl",
  xl: "px-6 py-3.5 text-base rounded-2xl",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isFullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      isFullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          "active:scale-[0.98]",
          variants[variant],
          sizes[size],
          isFullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {!isLoading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";