import React from "react";
import clsx from "clsx";
import { LoaderCircle } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "danger" | "outline";
  size?: "small" | "medium" | "large";
  rounded?: "small" | "medium" | "large" | "full";
  isLoading?: boolean;
  loadingText?: string;
}

const buttonClasses = {
  variants: {
    default: "bg-foreground text-background hover:bg-foreground/80",
    outline: "border hover:bg-foreground/5",
    primary: "bg-primary text-white hover:bg-primary/80",
    secondary: "bg-secondary hover:bg-secondary/80",
    danger: "bg-red-500 text-white hover:bg-red-600",
  },
  sizes: {
    small: "h-8 px-3 text-sm",
    medium: "h-10 px-4 text-base",
    large: "h-14 px-6 text-lg",
  },
  rounded: {
    small: "rounded",
    medium: "rounded-lg",
    large: "rounded-2xl",
    full: "rounded-full",
  },
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "medium",
  rounded = "large",
  isLoading = false,
  loadingText,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "font-medium focus:outline-none",
        buttonClasses.variants[variant],
        buttonClasses.sizes[size],
        buttonClasses.rounded[rounded],
        className
      )}
      {...props}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? (
        <span className="flex items-center gap-1 justify-center">
          <LoaderCircle className="animate-spin" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
