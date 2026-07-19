import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  velocity: number;
};

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = false;

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

    let targetMouse = { x: width / 2, y: height / 2 };
    let currentMouse = { x: width / 2, y: height / 2 };
    
    // Theme colors: white, light blue (royal), pink (candy), purple
    const colors = ['#ffffff', '#ffffff', '#315CFF', '#FF4D6D', '#7A3CFF'];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      stars = Array.from({ length: 450 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2,
        radius: Math.random() * 1.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: Math.random() * 0.15 + 0.05,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Interpolate mouse movement for smoothness
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.1;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.1;
      
      stars.forEach((star) => {
        // Move stars slowly upwards to create parallax drifting
        star.y -= star.velocity;

        // Reset if they go off top
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        // Mouse repulsion
        const dx = currentMouse.x - star.x;
        const dy = currentMouse.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let offsetX = 0;
        let offsetY = 0;
        const repulsionRadius = 180;

        if (distance < repulsionRadius) {
          // Calculate force (stronger closer to the center, softening out)
          const force = Math.pow((repulsionRadius - distance) / repulsionRadius, 2);
          offsetX = -(dx / distance) * force * 18;
          offsetY = -(dy / distance) * force * 18;
        }

        ctx.beginPath();
        ctx.arc(star.x + offsetX, star.y + offsetY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        
        // Depth simulation (opacity based on Z)
        ctx.globalAlpha = star.z * 0.4 + 0.15;
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
