export function getCategoryDisplayName(category: string): string {
  const categoryMap: Record<string, string> = {
    'web': 'Web Development',
    'web-gelistirme': 'Web Geliştirme',
    'design': 'Design',
    'tasarim': 'Tasarım',
    'personal': 'Personal',
    'kisisel': 'Kişisel',
  };
  return categoryMap[category] || category;
}