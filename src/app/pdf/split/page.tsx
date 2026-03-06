'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function SplitPdfPage() {
  const [file, setFile] = useState<{ name: string; data: ArrayBuffer; pages: number } | null>(null);
  const [range, setRange] = useState('');
  const [splitting, setSplitting] = useState(false);

  const loadFile = async (f: File) => {
    const data = await f.arrayBuffer();
    try {
      const pdf = await PDFDocument.load(data);
      setFile({ name: f.name, data, pages: pdf.getPageCount() });
      setRange(`1-${pdf.getPageCount()}`);
    } catch {
      alert('無法讀取此 PDF');
    }
  };

  const splitPdf = async () => {
    if (!file) return;
    setSplitting(true);
    try {
      const sourcePdf = await PDFDocument.load(file.data);
      const totalPages = sourcePdf.getPageCount();

      // Parse range: "1-3,5,7-9"
      const indices: number[] = [];
      for (const part of range.split(',')) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [start, end] = trimmed.split('-').map(Number);
          for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
            indices.push(i - 1);
          }
        } else {
          const num = parseInt(trimmed);
          if (num >= 1 && num <= totalPages) indices.push(num - 1);
        }
      }

      if (indices.length === 0) {
        alert('請輸入有效的頁碼範圍');
        setSplitting(false);
        return;
      }

      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(sourcePdf, indices);
      pages.forEach(page => newPdf.addPage(page));

      const bytes = await newPdf.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `split_${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('拆分失敗');
    } finally {
      setSplitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">✂️ 拆分 PDF</h1>
      <p className="text-gray-400 mb-8">選擇要保留的頁面，擷取成新的 PDF。</p>

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

          <div>
            <label className="block text-sm text-gray-400 mb-2">頁碼範圍（例如：1-3,5,7-9）</label>
            <input
              type="text"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-white"
              placeholder="1-3,5,7-9"
            />
          </div>

          <button
            onClick={splitPdf}
            disabled={splitting || !range.trim()}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 rounded-xl font-medium transition-all active:scale-[0.98]"
          >
            {splitting ? '拆分中...' : '✂️ 拆分並下載'}
          </button>
        </div>
      )}
    </div>
  );
}
