'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function CompressPdfPage() {
  const [file, setFile] = useState<{ name: string; data: ArrayBuffer; size: number } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ size: number; url: string } | null>(null);

  const loadFile = async (f: File) => {
    const data = await f.arrayBuffer();
    setFile({ name: f.name, data, size: f.size });
    setResult(null);
  };

  const compress = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      // Load and re-save — pdf-lib drops unused objects and optimizes structure
      const pdf = await PDFDocument.load(file.data);
      const bytes = await pdf.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResult({ size: bytes.length, url });
    } catch {
      alert('壓縮失敗');
    } finally {
      setProcessing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const reduction = file && result ? Math.max(0, ((file.size - result.size) / file.size * 100)) : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">🗜️ 壓縮 PDF</h1>
      <p className="text-gray-400 mb-8">移除多餘資料，縮小 PDF 檔案大小。</p>

      {!file ? (
        <div
          onClick={() => document.getElementById('file-input')?.click()}
          className="border-2 border-dashed border-gray-700 hover:border-gray-500 rounded-2xl p-12 text-center cursor-pointer bg-gray-900/50 transition-all"
        >
          <input id="file-input" type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])} />
          <div className="text-4xl mb-3">📄</div>
          <p className="font-medium">選擇 PDF 檔案</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">原始大小：{formatSize(file.size)}</p>
            </div>
            <button onClick={() => { setFile(null); setResult(null); }} className="text-sm text-gray-400 hover:text-red-400">換檔案</button>
          </div>

          {!result ? (
            <button onClick={compress} disabled={processing}
              className="w-full py-3 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 rounded-xl font-medium transition-all active:scale-[0.98]">
              {processing ? '壓縮中...' : '🗜️ 開始壓縮'}
            </button>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center animate-fadeIn">
              <div className="text-4xl mb-3">{reduction > 5 ? '✅' : 'ℹ️'}</div>
              <p className="text-lg font-bold mb-1">
                {reduction > 5 ? `縮小了 ${reduction.toFixed(1)}%` : '此檔案已經很小了'}
              </p>
              <p className="text-sm text-gray-400 mb-4">
                {formatSize(file.size)} → {formatSize(result.size)}
              </p>
              <a href={result.url} download={`compressed_${file.name}`}
                className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-all">
                📥 下載壓縮後的 PDF
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
