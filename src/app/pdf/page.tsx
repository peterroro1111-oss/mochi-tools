import Link from 'next/link';

const tools = [
  { href: '/pdf/merge', icon: '📑', name: '合併 PDF', desc: '多個 PDF 合成一個', color: 'from-blue-50 to-sky-50' },
  { href: '/pdf/split', icon: '✂️', name: '拆分 PDF', desc: '擷取指定頁面', color: 'from-amber-50 to-yellow-50' },
  { href: '/pdf/rotate', icon: '🔄', name: '旋轉 PDF', desc: '旋轉頁面方向', color: 'from-emerald-50 to-green-50' },
  { href: '/pdf/page-numbers', icon: '🔢', name: '加頁碼', desc: '自動加上頁碼', color: 'from-violet-50 to-purple-50' },
  { href: '/pdf/compress', icon: '🗜️', name: '壓縮 PDF', desc: '縮小檔案大小', color: 'from-rose-50 to-pink-50' },
  { href: '/pdf/to-image', icon: '🖼️', name: 'PDF 轉圖片', desc: '轉成 JPG/PNG', color: 'from-cyan-50 to-teal-50' },
];

export default function PdfToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-12">
      <div className="mb-8 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">📄 PDF 工具</h1>
        <p className="text-sm md:text-base text-[#b89b8a]">所有 PDF 工具都在瀏覽器本地處理，檔案不會上傳到伺服器 🔒</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {tools.map(tool => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`bg-gradient-to-br ${tool.color} border-2 border-pink-100 hover:border-pink-300 rounded-2xl p-5 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}
          >
            <div className="text-2xl md:text-3xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">{tool.icon}</div>
            <h3 className="font-bold text-sm md:text-base text-gray-700">{tool.name}</h3>
            <p className="text-xs text-gray-400 mt-1">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
