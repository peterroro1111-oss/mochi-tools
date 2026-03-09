import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'videoIndex' });
  return { title: t('meta.title'), description: t('meta.description') };
}

export default function VideoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
