import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const categoryKeys = [
  { key: 'pdf', href: '/pdf', icon: '📄', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400', shadow: 'hover:shadow-blue-100/50', iconBg: 'bg-blue-100' },
  { key: 'image', href: '/image', icon: '🖼️', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400', shadow: 'hover:shadow-amber-100/50', iconBg: 'bg-amber-100' },
  { key: 'removeBg', href: '/remove-bg', icon: '🎨', gradient: 'from-violet-50 to-purple-50', border: 'border-violet-200 hover:border-violet-400', shadow: 'hover:shadow-violet-100/50', iconBg: 'bg-violet-100' },
  { key: 'photo', href: '/photo', icon: '📸', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400', shadow: 'hover:shadow-rose-100/50', iconBg: 'bg-rose-100' },
  { key: 'utility', href: '/qrcode', icon: '🔧', gradient: 'from-teal-50 to-cyan-50', border: 'border-teal-200 hover:border-teal-400', shadow: 'hover:shadow-teal-100/50', iconBg: 'bg-teal-100' },
];

const featureKeys = [
  { key: 'privacy', icon: '🔒' },
  { key: 'speed', icon: '⚡' },
  { key: 'free', icon: '💰' },
  { key: 'mobile', icon: '📱' },
];

export default async function HomePage() {
  const t = await getTranslations('home');

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
          {t('heroTitle')}
        </h1>
        <p className="text-base md:text-lg text-[#b89b8a] max-w-md mx-auto leading-relaxed">
          {t('heroSubtitle')}
          <br />
          {t('heroPrivacy')}<strong className="text-pink-400">{t('heroHighlight')}</strong> 🔒
        </p>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
        {categoryKeys.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className={`bg-gradient-to-br ${cat.gradient} ${cat.border} ${cat.shadow} border-2 rounded-3xl p-6 md:p-8 hover:scale-[1.03] hover:shadow-xl transition-all duration-300 group`}
          >
            <div className={`w-14 h-14 ${cat.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
              {cat.icon}
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">{t(`categories.${cat.key}.name`)}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">{t(`categories.${cat.key}.desc`)}</p>
          </Link>
        ))}
      </div>

      {/* Features */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
          {t('whyTitle')}
        </h2>
        <p className="text-sm text-[#b89b8a] mb-10">{t('whySubtitle')}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featureKeys.map((f) => (
            <div key={f.key} className="bg-white rounded-2xl p-5 md:p-6 border-2 border-pink-50 hover:border-pink-200 transition-all duration-300 animate-wiggle">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold mb-1 text-gray-700 text-sm md:text-base">{t(`features.${f.key}.title`)}</h3>
              <p className="text-xs md:text-sm text-gray-400">{t(`features.${f.key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
