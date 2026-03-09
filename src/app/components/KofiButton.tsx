'use client';

import { useState, useCallback, useEffect } from 'react';

export default function KofiButton() {
  const [expanded, setExpanded] = useState(false);
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    // Load Ko-fi widget script for the overlay payment modal
    if (!document.getElementById('kofi-script')) {
      const script = document.createElement('script');
      script.id = 'kofi-script';
      script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
      script.async = true;
      script.onload = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).kofiWidgetOverlay?.draw('mochitools', {
          'type': 'floating-chat',
          'floating-chat.donateButton.text': 'Support',
          'floating-chat.donateButton.background-color': '#f8a4b8',
          'floating-chat.donateButton.text-color': '#fff',
        });
        // Hide the default Ko-fi floating button, we use our own
        const style = document.createElement('style');
        style.textContent = '.floatingchat-container-wrap,.floatingchat-container{display:none!important}';
        document.head.appendChild(style);
      };
      document.body.appendChild(script);
    }
  }, []);

  const openKofi = useCallback(() => {
    // Try to trigger the Ko-fi overlay
    const btn = document.querySelector('.floatingchat-container-wrap button, .floatingchat-container button') as HTMLElement;
    if (btn) {
      // Temporarily show, click, then hide again
      const wrap = document.querySelector('.floatingchat-container-wrap,.floatingchat-container') as HTMLElement;
      if (wrap) { wrap.style.display = 'block'; }
      btn.click();
      setTimeout(() => { if (wrap) wrap.style.display = 'none'; }, 100);
    } else {
      window.open('https://ko-fi.com/mochitools', '_blank');
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setExpanded(false);
  }, []);

  const handleClick = useCallback(() => {
    // Mobile: first tap shows text, second tap opens Ko-fi
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      if (!tapped) {
        setTapped(true);
        setExpanded(true);
        setTimeout(() => {
          setTapped(false);
          setExpanded(false);
        }, 3000);
        return;
      }
    }
    openKofi();
  }, [tapped, openKofi]);

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-none overflow-hidden"
      style={{
        padding: expanded ? '12px 20px 12px 16px' : '12px 16px',
        backgroundColor: '#f8a4b8',
      }}
      aria-label="Support on Ko-fi"
    >
      <span className="text-lg leading-none">☕</span>
      <span
        className="whitespace-nowrap text-sm font-medium text-white transition-all duration-300 overflow-hidden"
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
