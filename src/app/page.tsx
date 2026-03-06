import Link from 'next/link';

const categories = [
  {
    href: '/pdf',
    icon: '📄',
    name: 'PDF 工具',
    desc: '合併、拆分、旋轉、加頁碼，所有 PDF 需求一站搞定',
    color: 'from-blue-900/50 to-blue-800/20 border-blue-700/40 hover:border-blue-500/60',
  },
  {
    href: '/remove-bg',
    icon: '🎨',
    name: 'AI 去背',
    desc: '一鍵移除圖片背景，電商、設計必備',
    tag: '即將推出',
    color: 'from-violet-900/50 to-violet-800/20 border-violet-700/40 hover:border-violet-500/60',
  },
  {
    href: '/photo',
    icon: '📸',
    name: 'AI 證件照',
    desc: '上傳自拍，自動生成標準證件照',
    tag: '即將推出',
    color: 'from-rose-900/50 to-rose-800/20 border-rose-700/40 hover:border-rose-500/60',
  },
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            免費線上工具
          </span>
        </h1>
        <p className="text-lg text-gray-400">PDF 處理、AI 去背、證件照，全部線上搞定，無需安裝軟體</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className={`bg-gradient-to-br ${cat.color} border rounded-2xl p-8 hover:scale-[1.03] transition-all relative group`}
          >
            {cat.tag && (
              <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full">
                {cat.tag}
              </span>
            )}
            <div className="text-5xl mb-4">{cat.icon}</div>
            <h2 className="text-xl font-bold mb-2">{cat.name}</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{cat.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-2xl font-bold mb-8">為什麼選擇 YU Tools？</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-bold mb-1">隱私安全</h3>
            <p className="text-sm text-gray-400">檔案在瀏覽器本地處理，不上傳伺服器</p>
          </div>
          <div>
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold mb-1">極速處理</h3>
            <p className="text-sm text-gray-400">純前端運算，不需等待伺服器回應</p>
          </div>
          <div>
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-bold mb-1">完全免費</h3>
            <p className="text-sm text-gray-400">所有基礎工具免費使用，無需註冊</p>
          </div>
        </div>
      </div>
    </div>
  );
}
