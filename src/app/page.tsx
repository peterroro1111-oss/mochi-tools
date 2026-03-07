import Link from 'next/link';

const categories = [
  {
    href: '/pdf',
    icon: '📄',
    name: 'PDF 工具',
    desc: '合併、拆分、旋轉、壓縮、加頁碼、轉圖片',
    gradient: 'from-blue-50 to-indigo-50',
    border: 'border-blue-200 hover:border-blue-400',
    shadow: 'hover:shadow-blue-100/50',
    iconBg: 'bg-blue-100',
  },
  {
    href: '/remove-bg',
    icon: '🎨',
    name: 'AI 去背',
    desc: '一鍵移除圖片背景，電商、設計必備',
    gradient: 'from-violet-50 to-purple-50',
    border: 'border-violet-200 hover:border-violet-400',
    shadow: 'hover:shadow-violet-100/50',
    iconBg: 'bg-violet-100',
  },
  {
    href: '/photo',
    icon: '📸',
    name: 'AI 證件照',
    desc: '上傳自拍，自動生成標準證件照',
    gradient: 'from-rose-50 to-pink-50',
    border: 'border-rose-200 hover:border-rose-400',
    shadow: 'hover:shadow-rose-100/50',
    iconBg: 'bg-rose-100',
  },
];

const features = [
  { icon: '🔒', title: '隱私安全', desc: '檔案在瀏覽器本地處理，絕不上傳伺服器' },
  { icon: '⚡', title: '極速處理', desc: '純前端運算，不需等待伺服器回應' },
  { icon: '💰', title: '完全免費', desc: '所有工具免費使用，無需註冊帳號' },
  { icon: '📱', title: '手機友善', desc: '完美支援手機與平板，隨時隨地使用' },
];

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
      {/* Hero */}
      <div className="text-center mb-14 md:mb-20">
        <img
          src="/mochi-logo-transparent.png"
          alt="Mochi Tools"
          className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-6 animate-float drop-shadow-lg"
        />
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-800">
          免費線上工具
        </h1>
        <p className="text-base md:text-lg text-[#b89b8a] max-w-md mx-auto leading-relaxed">
          PDF 處理、AI 去背、證件照
          <br />
          全部在瀏覽器完成，<strong className="text-pink-400">檔案不離開你的電腦</strong> 🔒
        </p>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className={`bg-gradient-to-br ${cat.gradient} ${cat.border} ${cat.shadow} border-2 rounded-3xl p-6 md:p-8 hover:scale-[1.03] hover:shadow-xl transition-all duration-300 group`}
          >
            <div className={`w-14 h-14 ${cat.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
              {cat.icon}
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">{cat.name}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">{cat.desc}</p>
          </Link>
        ))}
      </div>

      {/* Features */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
          為什麼選擇 Mochi Tools？
        </h2>
        <p className="text-sm text-[#b89b8a] mb-10">簡單好用的小工具，像麻糬一樣軟 Q 🍡</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-5 md:p-6 border-2 border-pink-50 hover:border-pink-200 transition-all duration-300 animate-wiggle">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold mb-1 text-gray-700 text-sm md:text-base">{f.title}</h3>
              <p className="text-xs md:text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
