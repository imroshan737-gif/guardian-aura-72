import { useEffect, useRef, memo } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const ParticleBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const isVisibleRef = useRef(true);
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef(0);
  const FPS = 30; // Throttle to 30 FPS for performance
  const frameInterval = 1000 / FPS;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Reduce resolution for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      // Reinitialize particles on resize
      initParticles(width, height);
    };

    const initParticles = (width: number, height: number) => {
      // Reduced particle count for better performance
      const particleCount = Math.min(40, Math.floor((width * height) / 40000));
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    resizeCanvas();
    
    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    };
    window.addEventListener("resize", handleResize);

    // Visibility change handler - pause when tab is hidden
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (isVisibleRef.current && !animationRef.current) {
        lastTimeRef.current = performance.now();
        animate(lastTimeRef.current);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = (currentTime: number) => {
      if (!isVisibleRef.current) {
        animationRef.current = undefined;
        return;
      }

      animationRef.current = requestAnimationFrame(animate);

      // Throttle frame rate
      const elapsed = currentTime - lastTimeRef.current;
      if (elapsed < frameInterval) return;
      lastTimeRef.current = currentTime - (elapsed % frameInterval);

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear with fade effect (simpler than before)
      ctx.fillStyle = "rgba(8, 12, 21, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Disable shadows for performance
      ctx.shadowBlur = 0;

      const particles = particlesRef.current;
      
      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around
        if (particle.x > width) particle.x = 0;
        if (particle.x < 0) particle.x = width;
        if (particle.y > height) particle.y = 0;
        if (particle.y < 0) particle.y = height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${particle.opacity})`;
        ctx.fill();
      }

      // Draw fewer connections (only check every 3rd particle)
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i += 2) {
        const p1 = particles[i];
        for (let j = i + 2; j < particles.length; j += 2) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          // Use squared distance to avoid sqrt
          if (distSq < 12000) { // ~110px
            const alpha = 0.08 * (1 - distSq / 12000);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    animate(performance.now());

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
});

ParticleBackground.displayName = "ParticleBackground";

export default ParticleBackground;
