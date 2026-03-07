'use client';

import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';

interface PdfFile {
  name: string;
  data: ArrayBuffer;
  pages: number;
}

export default function MergePdfPage() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = async (fileList: FileList) => {
    const newFiles: PdfFile[] = [];
    for (const file of Array.from(fileList)) {
      if (file.type !== 'application/pdf') continue;
      const data = await file.arrayBuffer();
      try {
        const pdf = await PDFDocument.load(data);
        newFiles.push({ name: file.name, data, pages: pdf.getPageCount() });
      } catch {
        alert(`${file.name} 無法讀取`);
      }
    }
    setFiles(prev => [...prev, ...newFiles]);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: -1 | 1) => {
    setFiles(prev => {
      const arr = [...prev];
      const target = index + direction;
      if (target < 0 || target >= arr.length) return arr;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return arr;
    });
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setMerging(true);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const pdf = await PDFDocument.load(file.data);
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => merged.addPage(page));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('合併失敗，請確認檔案是否正常');
    } finally {
      setMerging(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">📑 合併 PDF</h1>
      <p className="text-gray-500 mb-8">選擇多個 PDF 檔案，合併成一個。可拖曳調整順序。</p>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => document.getElementById('file-input')?.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
          ${isDragging ? 'border-blue-400 bg-blue-400/10' : 'border-gray-300 hover:border-emerald-400 bg-white/80'}`}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <div className="text-4xl mb-3">📄</div>
        <p className="font-medium">拖放 PDF 檔案到這裡，或點擊選擇</p>
        <p className="text-sm text-gray-500 mt-1">支援多選，檔案不會上傳到伺服器</p>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          {files.map((file, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between group">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-gray-500 text-sm w-6 text-center">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.pages} 頁</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => moveFile(i, -1)} className="p-1.5 text-gray-500 hover:text-white rounded transition-colors" title="上移">▲</button>
                <button onClick={() => moveFile(i, 1)} className="p-1.5 text-gray-500 hover:text-white rounded transition-colors" title="下移">▼</button>
                <button onClick={() => removeFile(i)} className="p-1.5 text-gray-500 hover:text-red-500 rounded transition-colors" title="移除">✕</button>
              </div>
            </div>
          ))}

          <div className="pt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">共 {files.length} 個檔案，{files.reduce((s, f) => s + f.pages, 0)} 頁</p>
            <button
              onClick={mergePdfs}
              disabled={files.length < 2 || merging}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-300 disabled:text-gray-500 rounded-xl font-medium transition-all active:scale-95"
            >
              {merging ? '合併中...' : '📑 合併並下載'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
