'use client';

import { useEffect } from 'react';

export default function KofiButton() {
  useEffect(() => {
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

  return null;
}
