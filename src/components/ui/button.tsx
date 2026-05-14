import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[18px] text-sm font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-[250ms] ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-0 bg-gradient-to-br from-[#FFD60A] to-[#FFB703] text-[#1A1A1A] shadow-[0_10px_30px_rgba(255,214,10,0.35)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_14px_40px_rgba(255,214,10,0.45)] active:translate-y-0 active:scale-[0.99]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:-translate-y-px",
        outline:
          "border border-[rgb(255,255,255/0.4)] bg-[rgb(255,255,255/0.5)] backdrop-blur-md shadow-sm hover:bg-[rgb(255,255,255/0.72)] hover:text-foreground",
        secondary:
          "border-0 bg-gradient-to-br from-[#FFD60A] to-[#FFB703] text-[#1A1A1A] shadow-[0_8px_24px_rgba(255,214,10,0.28)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_12px_36px_rgba(255,214,10,0.4)] active:translate-y-0 active:scale-[0.99]",
        ghost:
          "hover:bg-[rgb(255,214,10/0.15)] hover:text-foreground",
        link: "rounded-md text-[#FFB703] underline-offset-4 hover:underline shadow-none hover:translate-y-0 hover:scale-100",
      },
      size: {
        default: "h-auto min-h-[2.25rem] px-6 py-2.5",
        sm: "min-h-[2rem] rounded-[14px] px-4 py-2 text-xs",
        lg: "min-h-[2.75rem] rounded-[20px] px-8 py-3",
        icon: "h-10 w-10 rounded-[14px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
