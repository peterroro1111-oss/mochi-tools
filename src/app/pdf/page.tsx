import Link from 'next/link';

const tools = [
  { href: '/pdf/merge', icon: '📑', name: '合併 PDF', desc: '多個 PDF 合成一個' },
  { href: '/pdf/split', icon: '✂️', name: '拆分 PDF', desc: '擷取指定頁面' },
  { href: '/pdf/rotate', icon: '🔄', name: '旋轉 PDF', desc: '旋轉頁面方向' },
  { href: '/pdf/page-numbers', icon: '🔢', name: '加頁碼', desc: '自動加上頁碼' },
  { href: '/pdf/compress', icon: '🗜️', name: '壓縮 PDF', desc: '縮小檔案大小' },
  { href: '/pdf/to-image', icon: '🖼️', name: 'PDF 轉圖片', desc: '轉成 JPG/PNG' },
];

export default function PdfToolsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">📄 PDF 工具</h1>
      <p className="text-gray-500 mb-8">所有 PDF 工具都在瀏覽器本地處理，檔案不會上傳到伺服器。</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map(tool => (
          <Link key={tool.href} href={tool.href} className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{tool.icon}</div>
            <h3 className="font-bold text-sm text-gray-700">{tool.name}</h3>
            <p className="text-xs text-gray-400 mt-1">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
