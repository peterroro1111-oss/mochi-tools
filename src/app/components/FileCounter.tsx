'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { getFileCount } from '../utils/usage';

export default function FileCounter() {
  const [count, setCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const t = useTranslations('home');
  const animRef = useRef<number>(0);

  useEffect(() => {
    const total = getFileCount();
    setCount(total);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    const duration = 1200;
    const startTime = performance.now();
    const startVal = 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplayCount(Math.floor(startVal + (count - startVal) * eased));
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [count]);

  if (count === 0) return null;

  return (
    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full border border-pink-200">
      <span className="text-sm font-bold text-pink-500">
        {t('counterLabel', { count: displayCount.toLocaleString() })}
      </span>
    </div>
  );
}
