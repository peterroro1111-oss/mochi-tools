'use client';

import { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';

export default function RotatePdfPage() {
  const [file, setFile] = useState<{ name: string; data: ArrayBuffer; pages: number } | null>(null);
  const [rotation, setRotation] = useState(90);
  const [processing, setProcessing] = useState(false);

  const loadFile = async (f: File) => {
    const data = await f.arrayBuffer();
    try {
      const pdf = await PDFDocument.load(data);
      setFile({ name: f.name, data, pages: pdf.getPageCount() });
    } catch {
      alert('無法讀取此 PDF');
    }
  };

  const rotatePdf = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const pdf = await PDFDocument.load(file.data);
      pdf.getPages().forEach(page => {
        page.setRotation(degrees(page.getRotation().angle + rotation));
      });
      const bytes = await pdf.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rotated_${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('旋轉失敗');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">🔄 旋轉 PDF</h1>
      <p className="text-gray-400 mb-8">旋轉 PDF 所有頁面的方向。</p>

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
              <p className="text-sm text-gray-500">共 {file.pages} 頁</p>
            </div>
            <button onClick={() => setFile(null)} className="text-sm text-gray-400 hover:text-red-400">換檔案</button>
          </div>

          <div className="flex gap-3">
            {[90, 180, 270].map(deg => (
              <button
                key={deg}
                onClick={() => setRotation(deg)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  rotation === deg ? 'bg-blue-600' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                ↻ {deg}°
              </button>
            ))}
          </div>

          <button
            onClick={rotatePdf}
            disabled={processing}
            className="w-full py-3 bg-pink-600 hover:bg-pink-500 disabled:bg-gray-700 rounded-xl font-medium transition-all active:scale-[0.98]"
          >
            {processing ? '旋轉中...' : '🔄 旋轉並下載'}
          </button>
        </div>
      )}
    </div>
  );
}
