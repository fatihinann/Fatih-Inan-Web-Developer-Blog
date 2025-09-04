import { useParams } from 'next/navigation';

export function useCurrentLocale(): string {
  const params = useParams();
  return (params?.lang as string) || 'tr';
}