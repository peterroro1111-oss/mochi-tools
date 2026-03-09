'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import FAQSchema from '@/app/components/FAQSchema';
import RelatedTools from '@/app/components/RelatedTools';
import { downloadFile } from '@/app/utils/download';

type AudioSource = 'system' | 'mic' | 'both' | 'none';

export default function ScreenRecorderPage() {
  const t = useTranslations('screenRecorder');
  const locale = useLocale();

  const [audioSource, setAudioSource] = useState<AudioSource>('none');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && !navigator.mediaDevices?.getDisplayMedia) {
      setIsSupported(false);
    }
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return h > 0
      ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const startRecording = useCallback(async () => {
    try {
      chunksRef.current = [];
      setRecordedUrl(null);
      setRecordedBlob(null);

      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: audioSource === 'system' || audioSource === 'both',
      });

      let combinedStream = displayStream;

      if (audioSource === 'mic' || audioSource === 'both') {
        try {
          const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const ctx = new AudioContext();
          const dest = ctx.createMediaStreamDestination();

          if (audioSource === 'both') {
            const systemAudioTracks = displayStream.getAudioTracks();
            if (systemAudioTracks.length > 0) {
              const systemSource = ctx.createMediaStreamSource(new MediaStream(systemAudioTracks));
              systemSource.connect(dest);
            }
          }

          const micSource = ctx.createMediaStreamSource(micStream);
          micSource.connect(dest);

          combinedStream = new MediaStream([
            ...displayStream.getVideoTracks(),
            ...dest.stream.getAudioTracks(),
          ]);
        } catch {
          // Mic access denied, continue with display stream only
        }
      }

      streamRef.current = combinedStream;

      const recorder = new MediaRecorder(combinedStream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : 'video/webm',
      });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        setRecordedBlob(blob);
        setIsRecording(false);
        setIsPaused(false);
        if (timerRef.current) clearInterval(timerRef.current);

        // Cleanup streams
        combinedStream.getTracks().forEach((track) => track.stop());
      };

      // Auto-stop when user stops sharing screen
      combinedStream.getVideoTracks()[0].onended = () => {
        if (recorder.state !== 'inactive') recorder.stop();
      };

      recorder.start(1000);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setElapsed(0);

      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } catch {
      // User cancelled or API not available
    }
  }, [audioSource]);

  const pauseRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleDownload = () => {
    if (recordedBlob) {
      downloadFile(recordedBlob, `mochi-recording-${Date.now()}.webm`);
    }
  };

  const reset = () => {
    if (recordedUrl) URL.revokeObjectURL(recordedUrl);
    setRecordedUrl(null);
    setRecordedBlob(null);
    setElapsed(0);
  };

  const audioOptions: { key: AudioSource; icon: string }[] = [
    { key: 'none', icon: '🔇' },
    { key: 'system', icon: '🔊' },
    { key: 'mic', icon: '🎤' },
    { key: 'both', icon: '🎧' },
  ];

  const faqs = locale === 'zh'
    ? [
        { question: '螢幕錄影會上傳影片嗎？', answer: '不會！所有錄製和處理都在你的瀏覽器本地完成，影片不會上傳到任何伺服器。' },
        { question: '支援哪些瀏覽器？', answer: '支援 Chrome、Edge、Firefox 等現代瀏覽器。Safari 部分支援。手機瀏覽器可能不支援螢幕錄影功能。' },
        { question: '錄影格式是什麼？', answer: '錄影檔案為 WebM 格式，可以在大多數播放器和瀏覽器中播放。如需轉換為 MP4，可以使用我們的影片轉檔工具。' },
        { question: '可以同時錄製系統音效和麥克風嗎？', answer: '可以！選擇「兩者」音源選項即可同時錄製系統音效和麥克風聲音。' },
      ]
    : [
        { question: 'Are recordings uploaded anywhere?', answer: 'No! All recording and processing happens locally in your browser. No video data is sent to any server.' },
        { question: 'Which browsers are supported?', answer: 'Chrome, Edge, Firefox and other modern browsers are supported. Safari has partial support. Mobile browsers may not support screen recording.' },
        { question: 'What format is the recording?', answer: 'Recordings are in WebM format, playable in most media players and browsers. Use our video converter to convert to MP4 if needed.' },
        { question: 'Can I record both system audio and microphone?', answer: 'Yes! Select the "Both" audio source option to record both system audio and microphone simultaneously.' },
      ];

  const relatedToolsList = locale === 'zh'
    ? [
        { href: '/video/compress', icon: '🗜️', name: '影片壓縮', desc: '壓縮錄影檔案大小', gradient: 'from-fuchsia-50 to-pink-50', border: 'border-fuchsia-200 hover:border-fuchsia-400' },
        { href: '/convert/webm-to-mp4', icon: '🔄', name: 'WebM 轉 MP4', desc: '錄影轉為 MP4 格式', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
        { href: '/tools/password', icon: '🔑', name: '密碼產生器', desc: '產生安全密碼', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
        { href: '/convert/mp4-to-gif', icon: '🎞️', name: 'MP4 轉 GIF', desc: '影片轉 GIF 動圖', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
      ]
    : [
        { href: '/video/compress', icon: '🗜️', name: 'Video Compress', desc: 'Compress recording file size', gradient: 'from-fuchsia-50 to-pink-50', border: 'border-fuchsia-200 hover:border-fuchsia-400' },
        { href: '/convert/webm-to-mp4', icon: '🔄', name: 'WebM to MP4', desc: 'Convert recording to MP4', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
        { href: '/tools/password', icon: '🔑', name: 'Password Generator', desc: 'Generate secure passwords', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
        { href: '/convert/mp4-to-gif', icon: '🎞️', name: 'MP4 to GIF', desc: 'Convert video to GIF', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
      ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-4xl bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center">🎥</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      {!isSupported && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6 text-center">
          <p className="text-yellow-700 text-sm">{t('notSupported')}</p>
        </div>
      )}

      {/* Audio Source Selection */}
      {!isRecording && !recordedUrl && (
        <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">{t('audioLabel')}</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {audioOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setAudioSource(opt.key)}
                className={`px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                  audioSource === opt.key
                    ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-sm'
                    : 'bg-pink-50 text-gray-600 hover:bg-pink-100'
                }`}
              >
                <span className="text-lg block mb-1">{opt.icon}</span>
                {t(`audio.${opt.key}`)}
              </button>
            ))}
          </div>

          <button
            onClick={startRecording}
            disabled={!isSupported}
            className="w-full mt-5 py-3 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-2xl font-bold text-lg hover:from-red-500 hover:to-rose-600 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🔴 {t('startBtn')}
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">{t('browserHint')}</p>
        </div>
      )}

      {/* Recording State */}
      {isRecording && (
        <div className="bg-white rounded-2xl border-2 border-red-200 p-6 mb-6 text-center">
          <div className={`inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full ${isPaused ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600'}`}>
            <span className={`w-3 h-3 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'}`} />
            <span className="font-medium text-sm">{isPaused ? t('paused') : t('recording')}</span>
          </div>

          <div className="text-4xl font-mono font-bold text-gray-800 mb-6">
            {formatTime(elapsed)}
          </div>

          <div className="flex gap-3 justify-center">
            {isPaused ? (
              <button
                onClick={resumeRecording}
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all"
              >
                ▶ {t('resumeBtn')}
              </button>
            ) : (
              <button
                onClick={pauseRecording}
                className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-all"
              >
                ⏸ {t('pauseBtn')}
              </button>
            )}
            <button
              onClick={stopRecording}
              className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 transition-all"
            >
              ⏹ {t('stopBtn')}
            </button>
          </div>
        </div>
      )}

      {/* Preview & Download */}
      {recordedUrl && (
        <div className="bg-white rounded-2xl border-2 border-pink-100 p-5 mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-3">{t('previewLabel')}</h2>
          <video
            ref={videoRef}
            src={recordedUrl}
            controls
            className="w-full rounded-xl mb-4 bg-black"
          />
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-bold hover:from-pink-500 hover:to-rose-500 transition-all"
            >
              📥 {t('downloadBtn')}
            </button>
            <button
              onClick={reset}
              className="px-4 py-3 bg-pink-50 text-pink-500 rounded-xl font-medium hover:bg-pink-100 transition-all"
            >
              {t('resetBtn')}
            </button>
          </div>
          {recordedBlob && (
            <p className="text-xs text-gray-400 text-center mt-2">
              {t('fileSize')}: {(recordedBlob.size / 1024 / 1024).toFixed(2)} MB · {formatTime(elapsed)}
            </p>
          )}
        </div>
      )}

      <FAQSchema faqs={faqs} />
      <RelatedTools tools={relatedToolsList} />
    </div>
  );
}
