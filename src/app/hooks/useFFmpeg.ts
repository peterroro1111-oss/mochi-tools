'use client';

import { useRef, useState, useCallback } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';

async function toBlobURL(url: string, mimeType: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return URL.createObjectURL(new Blob([blob], { type: mimeType }));
}

let ffmpegInstance: FFmpeg | null = null;
let ffmpegLoaded = false;

export function useFFmpeg() {
  const ffmpegRef = useRef<FFmpeg | null>(ffmpegInstance);
  const [loaded, setLoaded] = useState(ffmpegLoaded);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const loadFFmpeg = useCallback(async () => {
    if (ffmpegLoaded && ffmpegInstance) {
      ffmpegRef.current = ffmpegInstance;
      setLoaded(true);
      return;
    }

    setLoading(true);
    setProgress(0);

    const ffmpeg = new FFmpeg();

    ffmpeg.on('progress', ({ progress: p }) => {
      setProgress(Math.round(p * 100));
    });

    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    ffmpegInstance = ffmpeg;
    ffmpegLoaded = true;
    ffmpegRef.current = ffmpeg;
    setLoaded(true);
    setLoading(false);
  }, []);

  return { ffmpegRef, loaded, loading, progress, loadFFmpeg, setProgress };
}
