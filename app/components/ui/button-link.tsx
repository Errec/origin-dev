"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
  icon: React.ReactNode;
  ariaLabel?: string; // Add ariaLabel prop
  tooltip?: string;   // Add tooltip prop
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ 
  className, 
  href, 
  icon,
  variant = "default",
  size = "icon",
  ariaLabel,  // Descriptive label for accessibility
  tooltip,    // Tooltip text
  ...props 
}) => {
  const currentPath = usePathname().split("/")[1];
  const targetPath = href.split("/")[1];
  const isDisabled = currentPath === targetPath;

  const buttonClasses = cn(
    buttonVariants({ variant: isDisabled ? "outline" : variant, size }), 
    className,
    isDisabled && "bg-amber-200 text-black pointer-events-none" // Apply yellow color and prevent interactions without changing cursor
  );

  return (
    <Link 
      href={href} 
      className={buttonClasses} 
      aria-disabled={isDisabled} 
      aria-label={ariaLabel}   // Apply aria-label
      title={tooltip}          // Apply tooltip
      {...props}
    >
      {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4" })}
    </Link>
  );
}

ButtonLink.displayName = "ButtonLink";

export { ButtonLink };
