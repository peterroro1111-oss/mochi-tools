import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'convertMeta' });
  return { title: t('mp4ToWebm.title'), description: t('mp4ToWebm.description') };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
