'use client';

import { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export default function PageNumbersPage() {
  const [file, setFile] = useState<{ name: string; data: ArrayBuffer; pages: number } | null>(null);
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'top-center'>('bottom-center');
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

  const addPageNumbers = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const pdf = await PDFDocument.load(file.data);
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();
      const total = pages.length;

      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        const text = `${i + 1} / ${total}`;
        const textWidth = font.widthOfTextAtSize(text, 10);

        let x = 0, y = 0;
        if (position === 'bottom-center') { x = (width - textWidth) / 2; y = 20; }
        else if (position === 'bottom-right') { x = width - textWidth - 30; y = 20; }
        else if (position === 'top-center') { x = (width - textWidth) / 2; y = height - 30; }

        page.drawText(text, { x, y, size: 10, font, color: rgb(0.4, 0.4, 0.4) });
      });

      const bytes = await pdf.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `numbered_${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('加頁碼失敗');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">🔢 加頁碼</h1>
      <p className="text-gray-500 mb-8">自動為 PDF 每一頁加上頁碼。</p>

      {!file ? (
        <div
          onClick={() => document.getElementById('file-input')?.click()}
          className="border-2 border-dashed border-gray-300 hover:border-emerald-400 rounded-2xl p-12 text-center cursor-pointer bg-white/80 transition-all"
        >
          <input id="file-input" type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])} />
          <div className="text-4xl mb-3">📄</div>
          <p className="font-medium">選擇 PDF 檔案</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">共 {file.pages} 頁</p>
            </div>
            <button onClick={() => setFile(null)} className="text-sm text-gray-500 hover:text-red-500">換檔案</button>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">頁碼位置</label>
            <div className="flex gap-3">
              {([['bottom-center', '底部置中'], ['bottom-right', '底部右側'], ['top-center', '頂部置中']] as const).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setPosition(val)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    position === val ? 'bg-blue-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={addPageNumbers}
            disabled={processing}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-300 rounded-xl font-medium transition-all active:scale-[0.98]"
          >
            {processing ? '處理中...' : '🔢 加頁碼並下載'}
          </button>
        </div>
      )}
    </div>
  );
}
