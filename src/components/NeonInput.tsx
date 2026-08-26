import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface NeonInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const NeonInput = forwardRef<HTMLInputElement, NeonInputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-xs font-medium text-muted-foreground tracking-[0.06em] uppercase">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70 [&_svg]:w-[18px] [&_svg]:h-[18px]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full h-12 px-4 rounded-xl",
              "bg-muted/40 border border-border",
              "text-[15px] text-foreground placeholder:text-muted-foreground/45",
              "transition-[border-color,box-shadow,background-color] duration-200",
              "focus:outline-none focus:bg-muted/60 focus:border-primary/60",
              "focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]",
              "hover:border-foreground/20",
              icon && "pl-11",
              error && "border-destructive/60 focus:border-destructive focus:shadow-[0_0_0_3px_hsl(var(--destructive)/0.12)]",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-destructive font-medium">{error}</p>
        )}
      </div>
    );
  }
);

NeonInput.displayName = "NeonInput";

export default NeonInput;
