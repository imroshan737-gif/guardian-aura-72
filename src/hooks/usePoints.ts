import { useState, useEffect, useCallback } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  points: number;
}

interface PointsData {
  total: number;
  history: { amount: number; reason: string; timestamp: string }[];
  achievements: Achievement[];
}

const ACHIEVEMENTS_LIST = [
  { id: "first_session", title: "First Steps", description: "Complete your first session", icon: "🌱", threshold: 1, type: "sessions" },
  { id: "five_sessions", title: "Building Habits", description: "Complete 5 sessions", icon: "🔥", threshold: 5, type: "sessions" },
  { id: "ten_sessions", title: "Dedicated Practitioner", description: "Complete 10 sessions", icon: "⭐", threshold: 10, type: "sessions" },
  { id: "first_100", title: "Century Club", description: "Earn 100 points", icon: "💯", threshold: 100, type: "points" },
  { id: "first_500", title: "Rising Star", description: "Earn 500 points", icon: "🌟", threshold: 500, type: "points" },
  { id: "first_1000", title: "Wellness Champion", description: "Earn 1000 points", icon: "🏆", threshold: 1000, type: "points" },
  { id: "breathing_master", title: "Breathing Master", description: "Complete 5 breathing sessions", icon: "🌬️", threshold: 5, type: "breathe" },
  { id: "focus_guru", title: "Focus Guru", description: "Complete 5 focus sessions", icon: "🎯", threshold: 5, type: "focus" },
  { id: "rest_expert", title: "Rest Expert", description: "Complete 5 rest sessions", icon: "😌", threshold: 5, type: "rest" },
];

export function usePoints() {
  const [pointsData, setPointsData] = useState<PointsData>({
    total: 0,
    history: [],
    achievements: [],
  });

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("neuroaura_points");
    if (stored) {
      try {
        setPointsData(JSON.parse(stored));
      } catch {
        // Invalid data, reset
      }
    }
  }, []);

  // Save to localStorage
  const saveData = useCallback((data: PointsData) => {
    localStorage.setItem("neuroaura_points", JSON.stringify(data));
  }, []);

  const addPoints = useCallback((amount: number, reason: string) => {
    setPointsData(prev => {
      const newHistory = [
        { amount, reason, timestamp: new Date().toISOString() },
        ...prev.history.slice(0, 49), // Keep last 50
      ];
      
      const newTotal = prev.total + amount;
      
      // Check for new achievements
      const newAchievements = [...prev.achievements];
      const sessionCount = newHistory.filter(h => h.reason.toLowerCase().includes("completed")).length;
      const breatheCount = newHistory.filter(h => h.reason.toLowerCase().includes("breathe")).length;
      const focusCount = newHistory.filter(h => h.reason.toLowerCase().includes("focus")).length;
      const restCount = newHistory.filter(h => h.reason.toLowerCase().includes("rest") || h.reason.toLowerCase().includes("recovery")).length;
      
      ACHIEVEMENTS_LIST.forEach(ach => {
        const alreadyEarned = newAchievements.some(a => a.id === ach.id);
        if (alreadyEarned) return;
        
        let earned = false;
        if (ach.type === "sessions" && sessionCount >= ach.threshold) earned = true;
        if (ach.type === "points" && newTotal >= ach.threshold) earned = true;
        if (ach.type === "breathe" && breatheCount >= ach.threshold) earned = true;
        if (ach.type === "focus" && focusCount >= ach.threshold) earned = true;
        if (ach.type === "rest" && restCount >= ach.threshold) earned = true;
        
        if (earned) {
          newAchievements.push({
            id: ach.id,
            title: ach.title,
            description: ach.description,
            icon: ach.icon,
            earnedAt: new Date().toISOString(),
            points: ach.threshold,
          });
        }
      });
      
      const newData = {
        total: newTotal,
        history: newHistory,
        achievements: newAchievements,
      };
      
      saveData(newData);
      return newData;
    });
  }, [saveData]);

  return {
    points: pointsData.total,
    history: pointsData.history,
    achievements: pointsData.achievements,
    addPoints,
  };
}
