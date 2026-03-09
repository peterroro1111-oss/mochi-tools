'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface FullPageDropZoneProps {
  onFiles: (files: FileList) => void;
  accept?: string; // e.g. ".pdf", "image/*", "video/*"
  disabled?: boolean;
}

export default function FullPageDropZone({ onFiles, accept, disabled }: FullPageDropZoneProps) {
  const t = useTranslations('dropZone');
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = { current: 0 };

  const matchesAccept = useCallback((file: File): boolean => {
    if (!accept) return true;
    const types = accept.split(',').map(s => s.trim());
    return types.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.replace('/*', '/'));
      }
      return file.type === type;
    });
  }, [accept]);

  useEffect(() => {
    if (disabled) return;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current++;
      if (e.dataTransfer?.types.includes('Files')) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current--;
      if (dragCounter.current === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current = 0;
      setIsDragging(false);

      if (e.dataTransfer?.files.length) {
        // Filter by accept type if specified
        const dt = new DataTransfer();
        Array.from(e.dataTransfer.files).forEach(file => {
          if (matchesAccept(file)) {
            dt.items.add(file);
          }
        });
        if (dt.files.length > 0) {
          onFiles(dt.files);
        }
      }
    };

    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, onFiles, matchesAccept]);

  if (!isDragging) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-pink-400/20 backdrop-blur-sm transition-all">
      <div className="border-4 border-dashed border-pink-400 rounded-3xl p-16 text-center bg-white/90 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
        <div className="text-6xl mb-4">📂</div>
        <p className="text-xl font-bold text-gray-700">{t('overlay')}</p>
        <p className="text-sm text-gray-400 mt-2">{t('overlayHint')}</p>
      </div>
    </div>
  );
}
