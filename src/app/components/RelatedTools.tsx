'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface RelatedTool {
  href: string;
  icon: string;
  name: string;
  desc: string;
  gradient: string;
  border: string;
}

export default function RelatedTools({ tools }: { tools: RelatedTool[] }) {
  const t = useTranslations('relatedTools');

  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        {t('title')}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`bg-gradient-to-br ${tool.gradient} ${tool.border} border-2 rounded-2xl p-4 hover:scale-[1.03] hover:shadow-lg transition-all duration-300 group text-center`}
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{tool.icon}</div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">{tool.name}</h3>
            <p className="text-xs text-gray-500">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
