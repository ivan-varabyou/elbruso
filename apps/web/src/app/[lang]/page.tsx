import { HomePage } from '@/views/HomePage';
import { getDictionary } from '../../../get-dictionary';
import { Locale } from '../../../i18n-config';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  };
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  return <HomePage dictionary={dictionary} />;
}
