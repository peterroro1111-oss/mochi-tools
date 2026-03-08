import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const toolKeys = [
  { key: 'merge', href: '/pdf/merge', color: 'from-blue-50 to-sky-50' },
  { key: 'split', href: '/pdf/split', color: 'from-amber-50 to-yellow-50' },
  { key: 'rotate', href: '/pdf/rotate', color: 'from-emerald-50 to-green-50' },
  { key: 'pageNumbers', href: '/pdf/page-numbers', color: 'from-violet-50 to-purple-50' },
  { key: 'compress', href: '/pdf/compress', color: 'from-rose-50 to-pink-50' },
  { key: 'toImage', href: '/pdf/to-image', color: 'from-cyan-50 to-teal-50' },
];

export default async function PdfToolsPage() {
  const t = await getTranslations('pdfIndex');

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-12">
      <div className="mb-8 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">{t('title')}</h1>
        <p className="text-sm md:text-base text-[#b89b8a]">{t('subtitle')}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {toolKeys.map(tool => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`bg-gradient-to-br ${tool.color} border-2 border-pink-100 hover:border-pink-300 rounded-2xl p-5 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}
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
