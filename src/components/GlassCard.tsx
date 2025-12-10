import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties, memo } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  animate?: boolean;
  style?: CSSProperties;
}

const GlassCard = memo(({ children, className, glow = false, animate = false, style }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-colors duration-300",
        glow && "glow-border",
        animate && "animate-fade-up",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
});

GlassCard.displayName = "GlassCard";

export default GlassCard;
