'use client';

import { useState, useCallback } from 'react';

export default function KofiButton() {
  const [expanded, setExpanded] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setExpanded(false);
  }, []);

  const handleClick = useCallback(() => {
    // Mobile: first tap shows text, second tap opens link
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      if (!touched) {
        setTouched(true);
        setExpanded(true);
        // Auto collapse after 3 seconds if not tapped again
        setTimeout(() => {
          setTouched(false);
          setExpanded(false);
        }, 3000);
        return;
      }
    }
    // Desktop click or mobile second tap: open Ko-fi
    window.open('https://ko-fi.com/mochitools', '_blank');
  }, [touched]);

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-0 bg-[#f8a4b8] hover:bg-[#f48fb1] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-none overflow-hidden"
      style={{ padding: expanded ? '12px 20px 12px 16px' : '12px 16px' }}
      aria-label="Support on Ko-fi"
    >
      <span className="text-lg leading-none">☕</span>
      <span
        className="whitespace-nowrap text-sm font-medium transition-all duration-300 overflow-hidden"
        style={{
          maxWidth: expanded ? '200px' : '0px',
          opacity: expanded ? 1 : 0,
          marginLeft: expanded ? '8px' : '0px',
        }}
      >
        Support Mochi Tools
      </span>
    </button>
  );
}
