import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const tools = [
  { key: 'compress', href: '/video/compress', gradient: 'from-violet-50 to-purple-50', border: 'border-violet-200 hover:border-violet-400' },
  { key: 'mp4ToWebm', href: '/convert/mp4-to-webm', gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200 hover:border-blue-400' },
  { key: 'webmToMp4', href: '/convert/webm-to-mp4', gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200 hover:border-emerald-400' },
  { key: 'mp4ToGif', href: '/convert/mp4-to-gif', gradient: 'from-amber-50 to-yellow-50', border: 'border-amber-200 hover:border-amber-400' },
  { key: 'movToMp4', href: '/convert/mov-to-mp4', gradient: 'from-rose-50 to-pink-50', border: 'border-rose-200 hover:border-rose-400' },
];

export default async function VideoIndexPage() {
  const t = await getTranslations('videoIndex');

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🎬</div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">{t('title')}</h1>
        <p className="text-[#b89b8a]">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`bg-gradient-to-br ${tool.gradient} ${tool.border} border-2 rounded-3xl p-6 hover:scale-[1.03] hover:shadow-xl transition-all duration-300 group text-center`}
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
              {t(`tools.${tool.key}.name`).split(' ')[0]}
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">{t(`tools.${tool.key}.name`)}</h2>
            <p className="text-sm text-gray-500">{t(`tools.${tool.key}.desc`)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
