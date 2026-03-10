import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const tools = [
  {
    key: 'compress',
    href: '/image/compress',
    gradient: 'from-amber-50 to-yellow-50',
    border: 'border-amber-200 hover:border-amber-400',
  },
  {
    key: 'convert',
    href: '/convert',
    gradient: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200 hover:border-emerald-400',
  },
  {
    key: 'watermark',
    href: '/image/watermark',
    gradient: 'from-sky-50 to-blue-50',
    border: 'border-sky-200 hover:border-sky-400',
  },
  {
    key: 'gif',
    href: '/image/gif',
    gradient: 'from-green-50 to-emerald-50',
    border: 'border-green-200 hover:border-green-400',
  },
  {
    key: 'annotate',
    href: '/image/annotate',
    gradient: 'from-orange-50 to-red-50',
    border: 'border-orange-200 hover:border-orange-400',
  },
];

export default async function ImageIndexPage() {
  const t = await getTranslations('imageIndex');

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🖼️</div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`bg-gradient-to-br ${tool.gradient} ${tool.border} border-2 rounded-3xl p-8 hover:scale-[1.03] hover:shadow-xl transition-all duration-300 group`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              {t(`tools.${tool.key}.name`).split(' ')[0]}
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t(`tools.${tool.key}.name`)}</h2>
            <p className="text-sm text-gray-500">{t(`tools.${tool.key}.desc`)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
