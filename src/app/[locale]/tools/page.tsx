import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const tools = [
  { key: 'color', href: '/tools/color', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
  { key: 'favicon', href: '/tools/favicon', gradient: 'from-yellow-50 to-amber-50', border: 'border-yellow-200 hover:border-yellow-400' },
  { key: 'palette', href: '/tools/palette', gradient: 'from-rose-50 to-red-50', border: 'border-rose-200 hover:border-rose-400' },
  { key: 'qrcode', href: '/qrcode', gradient: 'from-teal-50 to-emerald-50', border: 'border-teal-200 hover:border-teal-400' },
  { key: 'password', href: '/tools/password', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
  { key: 'screenRecorder', href: '/tools/screen-recorder', gradient: 'from-red-50 to-orange-50', border: 'border-red-200 hover:border-red-400' },
];

export default async function ToolsIndexPage() {
  const t = await getTranslations('toolsIndex');

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-12">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🔧</div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {tools.map(tool => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`bg-gradient-to-br ${tool.gradient} ${tool.border} border-2 rounded-2xl p-5 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}
          >
            <div className="text-2xl md:text-3xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              {t(`tools.${tool.key}.name`).split(' ')[0]}
            </div>
            <h3 className="font-bold text-sm md:text-base text-gray-700">{t(`tools.${tool.key}.name`)}</h3>
            <p className="text-xs text-gray-400 mt-1">{t(`tools.${tool.key}.desc`)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
