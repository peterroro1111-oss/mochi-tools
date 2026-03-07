import Link from 'next/link';

const tools = [
  {
    href: '/image/compress',
    icon: '🗜️',
    name: '圖片壓縮',
    desc: '壓縮 JPG、PNG、WebP，大幅縮小檔案大小',
    gradient: 'from-amber-50 to-yellow-50',
    border: 'border-amber-200 hover:border-amber-400',
  },
  {
    href: '/convert',
    icon: '🔄',
    name: '格式轉換',
    desc: 'PNG、JPG、WebP 互相轉換，6 種組合任你選',
    gradient: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200 hover:border-emerald-400',
  },
];

export default function ImageIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🖼️</div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">圖片工具</h1>
        <p className="text-[#b89b8a]">壓縮、轉檔，全部免費、不上傳伺服器 🔒</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`bg-gradient-to-br ${t.gradient} ${t.border} border-2 rounded-3xl p-8 hover:scale-[1.03] hover:shadow-xl transition-all duration-300 group`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{t.icon}</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t.name}</h2>
            <p className="text-sm text-gray-500">{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
