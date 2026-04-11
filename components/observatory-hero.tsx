'use client';

import { useEffect, useRef } from 'react';

interface ObservatoryHeroProps {
  title: string;
  title2? : string
  subtitle?: string;
  subDescription? : string;
  description?: string;
}

export function ObservatoryHero({ title, title2, subtitle, description , subDescription}: ObservatoryHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 600;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 167, 94, ${particle.opacity})`;
        ctx.fill();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(200, 167, 94, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 600;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative w-full h-[600px] overflow-hidden observatory-gradient">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F2A]/20 to-[#0B0F2A]" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {subtitle && (
          <p className="text-[#C8A75E] text-sm font-mono uppercase tracking-[0.2em] mb-4 animate-in fade-in duration-700">
            {subtitle}
          </p>
        )}

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#F5F3EE] mb-6 leading-[1.1] tracking-tight animate-in fade-in duration-700 delay-100">
          {title}
        </h1>

        {title2 && (
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#F5F3EE] mb-6 leading-[1.1] tracking-tight animate-in fade-in duration-700 delay-100">
          {title2}
        </h1>
        )}

        {subDescription && (
          <p className="text-lg md:text-xl mb-4 text-[#AAB0D6] max-w-3xl leading-relaxed animate-in fade-in duration-700 delay-200" >
            {subDescription}
          </p>
        )}

        {description && (
          <p className="text-base md:text-lg text-[#AAB0D6] max-w-3xl leading-relaxed animate-in fade-in duration-700 delay-200">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
