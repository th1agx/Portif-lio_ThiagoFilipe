import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  alpha: number;
  twinkleSpeed: number;
};

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = false; // Could be from a hook

  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Mouse positions for parallax
    let targetMouse = { x: width / 2, y: height / 2 };
    let currentMouse = { x: width / 2, y: height / 2 };
    
    // Deep space realistic colors (mostly white, some cyan, rare pink/purple)
    const colors = [
      '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', 
      '#e4e4ec', '#e4e4ec', 
      '#4dc4e8', // Cyan
      '#4dc4e8', 
      '#8b65c8', // Purple
      '#c46b8a'  // Pink
    ];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // 1200+ stars for dense deep space look
      const starCount = Math.floor((width * height) / 1200);
      
      stars = Array.from({ length: starCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1.5 + 0.1, // Depth (0.1 to 1.6)
        radius: Math.random() * 0.8 + 0.2, // Smaller realistic stars
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random(),
        twinkleSpeed: (Math.random() * 0.02) + 0.005,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Interpolate mouse movement for smooth parallax
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;
      
      // Calculate mouse offset from center (-1 to 1)
      const mouseXOffset = (currentMouse.x - width / 2) / (width / 2);
      const mouseYOffset = (currentMouse.y - height / 2) / (height / 2);

      stars.forEach((star) => {
        // Twinkle effect (sine wave based on time)
        star.alpha += star.twinkleSpeed;
        const currentAlpha = (Math.sin(star.alpha) * 0.5 + 0.5) * (star.z * 0.6 + 0.4);

        // Parallax offset based on depth (z)
        // Closer stars (higher z) move more
        const offsetX = mouseXOffset * 40 * star.z;
        const offsetY = mouseYOffset * 40 * star.z;

        // Apply slight continuous drift
        star.y -= 0.1 * star.z;
        star.x -= 0.05 * star.z;

        // Wrap around screen
        if (star.y < 0) star.y = height;
        if (star.x < 0) star.x = width;
        if (star.y > height) star.y = 0;
        if (star.x > width) star.x = 0;

        // Draw star
        ctx.beginPath();
        // Calculate final position wrapping around properly with parallax
        let finalX = star.x + offsetX;
        let finalY = star.y + offsetY;
        
        // Wrap final drawn position so it doesn't leave empty edges
        if (finalX < 0) finalX += width;
        if (finalX > width) finalX -= width;
        if (finalY < 0) finalY += height;
        if (finalY > height) finalY -= height;

        ctx.arc(finalX, finalY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    init();
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
