'use client';

import { useEffect } from 'react';

export default function KofiButton({ label }: { label: string }) {
  useEffect(() => {
    // Load Ko-fi widget script
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
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleClick = () => {
    // Try to open the Ko-fi overlay widget
    const btn = document.querySelector('.floatingchat-container-wrap button, .floatingchat-container button') as HTMLElement;
    if (btn) {
      btn.click();
    } else {
      window.open('https://ko-fi.com/mochitools', '_blank');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-xs text-[#b89b8a] hover:text-pink-400 transition-colors cursor-pointer bg-transparent border-none"
    >
      {label}
    </button>
  );
}
