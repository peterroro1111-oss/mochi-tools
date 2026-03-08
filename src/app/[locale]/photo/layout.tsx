import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'photo' });
  return { title: t('meta.title'), description: t('meta.description') };
}
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
