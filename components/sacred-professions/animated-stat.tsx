'use client';

import { useEffect, useRef, useState } from 'react';

export function AnimatedStat({ target, label }: { target: number | string; label: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const isNum = typeof target === 'number';

  useEffect(() => {
    if (!isNum) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1200;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * (target as number)));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, isNum]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl sm:text-3xl font-serif font-bold text-[#C8A75E]">
        {isNum ? value : target}
      </p>
      <p className="text-[10px] text-[#AAB0D6]/40 uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
}
