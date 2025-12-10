import { useState, useEffect, useCallback, useRef } from "react";

interface Vitals {
  stress: number;
  focus: number;
  energy: number;
}

interface UseRealtimeVitalsOptions {
  baseStress?: number;
  baseFocus?: number;
  baseEnergy?: number;
  updateInterval?: number;
}

export function useRealtimeVitals(options: UseRealtimeVitalsOptions = {}) {
  const {
    baseStress = 35,
    baseFocus = 75,
    baseEnergy = 65,
    updateInterval = 5000, // Increased interval for performance
  } = options;

  const [vitals, setVitals] = useState<Vitals>({
    stress: baseStress,
    focus: baseFocus,
    energy: baseEnergy,
  });

  const typingSpeedRef = useRef(0);
  const lastActivityRef = useRef(Date.now());
  const isVisibleRef = useRef(true);

  // Track user typing activity
  const trackTyping = useCallback((wpm: number) => {
    typingSpeedRef.current = wpm;
    lastActivityRef.current = Date.now();
  }, []);

  // Track user clicks/activity - throttled
  const trackActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  useEffect(() => {
    // Visibility change handler
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const interval = setInterval(() => {
      // Skip updates when tab is hidden
      if (!isVisibleRef.current) return;

      const now = Date.now();
      const idleTime = (now - lastActivityRef.current) / 1000;
      const typingSpeed = typingSpeedRef.current;
      
      setVitals((prev) => {
        let stressChange = 0;
        let focusChange = 0;
        let energyChange = 0;

        // Fast typing increases stress slightly
        if (typingSpeed > 60) {
          stressChange += 2;
          focusChange += 3;
        } else if (typingSpeed > 40) {
          stressChange += 1;
          focusChange += 2;
        } else if (typingSpeed > 0) {
          focusChange += 1;
        }

        // Long idle time suggests rest or distraction
        if (idleTime > 30) {
          stressChange -= 2;
          focusChange -= 3;
          energyChange -= 1;
        } else if (idleTime > 10) {
          stressChange -= 1;
          focusChange -= 1;
        }

        // Smaller variation for smoother updates
        const variation = (Math.random() - 0.5) * 2;

        const newStress = Math.min(100, Math.max(0, prev.stress + stressChange + variation * 0.3));
        const newFocus = Math.min(100, Math.max(0, prev.focus + focusChange + variation * 0.2));
        const newEnergy = Math.min(100, Math.max(0, prev.energy + energyChange + variation * 0.1));

        return {
          stress: Math.round(newStress),
          focus: Math.round(newFocus),
          energy: Math.round(newEnergy),
        };
      });
    }, updateInterval);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [updateInterval]);

  // Throttled activity listeners
  useEffect(() => {
    let throttleTimer: NodeJS.Timeout | null = null;
    
    const throttledActivity = () => {
      if (throttleTimer) return;
      throttleTimer = setTimeout(() => {
        trackActivity();
        throttleTimer = null;
      }, 1000);
    };
    
    window.addEventListener("mousemove", throttledActivity, { passive: true });
    window.addEventListener("click", throttledActivity, { passive: true });

    return () => {
      window.removeEventListener("mousemove", throttledActivity);
      window.removeEventListener("click", throttledActivity);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [trackActivity]);

  return {
    vitals,
    trackTyping,
    trackActivity,
  };
}
