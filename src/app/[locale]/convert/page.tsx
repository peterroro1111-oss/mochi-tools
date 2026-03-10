import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const conversions = [
  { href: '/convert/png-to-jpg', from: 'PNG', to: 'JPG', icon: '🖼️', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
  { href: '/convert/jpg-to-png', from: 'JPG', to: 'PNG', icon: '🎨', gradient: 'from-violet-50 to-purple-50', border: 'border-violet-200 hover:border-violet-400' },
  { href: '/convert/png-to-webp', from: 'PNG', to: 'WebP', icon: '⚡', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
  { href: '/convert/webp-to-png', from: 'WebP', to: 'PNG', icon: '🔁', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
  { href: '/convert/jpg-to-webp', from: 'JPG', to: 'WebP', icon: '🚀', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  { href: '/convert/webp-to-jpg', from: 'WebP', to: 'JPG', icon: '📷', gradient: 'from-orange-50 to-red-50', border: 'border-orange-200 hover:border-orange-400' },
  { href: '/convert/heic-to-jpg', from: 'HEIC', to: 'JPG', icon: '📱', gradient: 'from-cyan-50 to-sky-50', border: 'border-cyan-200 hover:border-cyan-400' },
];

export default async function ConvertIndexPage() {
  const t = await getTranslations('convertIndex');

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🔄</div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {conversions.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className={`bg-gradient-to-br ${c.gradient} ${c.border} border-2 rounded-3xl p-6 hover:scale-[1.03] hover:shadow-xl transition-all duration-300 group text-center`}
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{c.icon}</div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">{c.from} → {c.to}</h2>
            <p className="text-sm text-gray-500">{t('formatConvert', { from: c.from, to: c.to })}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
