import Link from 'next/link';

const categories = [
  {
    href: '/pdf',
    icon: '📄',
    name: 'PDF 工具',
    desc: '合併、拆分、旋轉、壓縮、加頁碼、轉圖片',
    color: 'from-blue-50 to-sky-50 border-blue-200 hover:border-blue-400 hover:shadow-blue-100',
    iconBg: 'bg-blue-100',
  },
  {
    href: '/remove-bg',
    icon: '🎨',
    name: 'AI 去背',
    desc: '一鍵移除圖片背景，電商、設計必備',
    color: 'from-violet-50 to-purple-50 border-violet-200 hover:border-violet-400 hover:shadow-violet-100',
    iconBg: 'bg-violet-100',
  },
  {
    href: '/photo',
    icon: '📸',
    name: 'AI 證件照',
    desc: '上傳自拍，自動生成標準證件照',
    color: 'from-rose-50 to-pink-50 border-rose-200 hover:border-rose-400 hover:shadow-rose-100',
    iconBg: 'bg-rose-100',
  },
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <img src="/panda-logo.png" alt="Panda Tools" className="w-28 h-28 mx-auto mb-6 animate-bounce drop-shadow-lg" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
          免費線上工具
        </h1>
        <p className="text-lg text-gray-500 max-w-md mx-auto">
          PDF 處理、AI 去背、證件照
          <br />
          全部在瀏覽器完成，<strong className="text-emerald-600">檔案不離開你的電腦</strong> 🔒
        </p>
      </div>

      {/* Tool Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className={`bg-gradient-to-br ${cat.color} border-2 rounded-2xl p-8 hover:scale-[1.03] hover:shadow-lg transition-all group`}
          >
            <div className={`w-14 h-14 ${cat.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">{cat.name}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">{cat.desc}</p>
          </Link>
        ))}
      </div>

      {/* Features */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-10 text-gray-700">
          為什麼選擇 Panda Tools？🐼
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-bold mb-1 text-gray-700">隱私安全</h3>
            <p className="text-sm text-gray-400">檔案在瀏覽器本地處理，不上傳伺服器</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold mb-1 text-gray-700">極速處理</h3>
            <p className="text-sm text-gray-400">純前端運算，不需等待伺服器回應</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-bold mb-1 text-gray-700">完全免費</h3>
            <p className="text-sm text-gray-400">所有工具免費使用，無需註冊帳號</p>
          </div>
        </div>
      </div>
    </div>
  );
}
