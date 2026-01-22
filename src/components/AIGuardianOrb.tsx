import { cn } from "@/lib/utils";

interface AIGuardianOrbProps {
  stressLevel?: "calm" | "balanced" | "rising" | "high" | "critical";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const AIGuardianOrb = ({ stressLevel = "calm", size = "md", onClick }: AIGuardianOrbProps) => {
  const stressColors = {
    calm: "from-cyan-400 via-cyan-500 to-blue-600",
    balanced: "from-emerald-400 via-green-500 to-teal-600",
    rising: "from-yellow-400 via-amber-500 to-orange-500",
    high: "from-orange-400 via-orange-500 to-red-500",
    critical: "from-red-400 via-red-500 to-rose-600",
  };

  const stressGlows = {
    calm: "shadow-[0_0_30px_hsl(180_100%_50%/0.4),0_0_60px_hsl(180_100%_50%/0.2)]",
    balanced: "shadow-[0_0_30px_hsl(142_76%_50%/0.4),0_0_60px_hsl(142_76%_50%/0.2)]",
    rising: "shadow-[0_0_30px_hsl(45_100%_50%/0.4),0_0_60px_hsl(45_100%_50%/0.2)]",
    high: "shadow-[0_0_30px_hsl(25_100%_55%/0.4),0_0_60px_hsl(25_100%_55%/0.2)]",
    critical: "shadow-[0_0_30px_hsl(0_84%_60%/0.4),0_0_60px_hsl(0_84%_60%/0.2)]",
  };

  const sizes = {
    sm: "w-14 h-14",
    md: "w-18 h-18",
    lg: "w-24 h-24",
  };

  const faceColors = {
    calm: "text-cyan-100",
    balanced: "text-emerald-100",
    rising: "text-amber-100",
    high: "text-orange-100",
    critical: "text-red-100",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative rounded-full cursor-pointer transition-transform duration-300 hover:scale-110",
        "bg-gradient-to-br",
        stressColors[stressLevel],
        stressGlows[stressLevel],
        sizes[size]
      )}
    >
      {/* Soft inner glow */}
      <div className="absolute inset-2 rounded-full bg-white/15" />
      
      {/* Face container */}
      <div className={cn("absolute inset-0 flex items-center justify-center", faceColors[stressLevel])}>
        {/* Eyes */}
        <div className="flex items-center gap-3 -mt-1">
          <div className="w-2.5 h-2.5 rounded-full bg-current" />
          <div className="w-2.5 h-2.5 rounded-full bg-current" />
        </div>
      </div>
      
      {/* Smile */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <svg 
          width="16" 
          height="8" 
          viewBox="0 0 16 8" 
          className={faceColors[stressLevel]}
        >
          <path 
            d="M2 2 Q8 8 14 2" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Label below */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="px-3 py-1 text-xs font-orbitron bg-card/90 rounded-lg border border-primary/30 text-primary">
          Aurora
        </span>
      </div>
    </button>
  );
};

export default AIGuardianOrb;
