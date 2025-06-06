import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive rounded-lg text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground text-xs",
        threedots: "hover:text-accent-foreground text-xs",
        link: "text-primary underline-offset-4 hover:underline",
        blue: "text-white bg-mydarkblue rounded-lg hover:bg-mydarkblue/80",
        yellow: "bg-myyellow rounded-sm hover:bg-myyellow/50",
        cyan: "bg-mycyan rounded-sm text-white hover:bg-mycyan/80",
        green: "bg-green-600 rounded-sm text-white text-xs hover:bg-emerald-500/80",
        lightcyan: "bg-[#E6EDF5] rounded-sm hover:bg-mycyan hover:text-white text-[#8C8C8C] shadow-md",
        gray: "bg-gray-500 rounded-sm hover:bg-indigo-500 rounded-3xl text-white shadow-md",
        indigo: "bg-myindigo text-white hover:bg-indigo-400 rounded-3xl",
        none: "",

      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-md px-8",
        icon: "h-9 w-9",
        xs: "h-4",
        md: "h-12 px-10 py-2",
        emptyLg: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
