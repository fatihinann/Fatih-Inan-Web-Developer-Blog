export const categoryMap: Record<string, string> = {
  'web-gelistirme': 'web',
  'tasarim': 'design',
  'kisisel': 'personal',
  'web': 'web-gelistirme',
  'design': 'tasarim',
  'personal': 'kisisel',
};

export const slugMap: Record<string, string> = {
  'modern-web-gelistirme': 'modern-web-development',
  'modern-web-development': 'modern-web-gelistirme',
};

export function getCategoryDisplayName(category: string): string {
  const categoryDisplayNameMap: Record<string, string> = {
    'web': 'Web',
    'web-gelistirme': 'Web Geliştirme',
    'design': 'Design',
    'tasarim': 'Tasarım',
    'personal': 'Personal',
    'kisisel': 'Kişisel',
  };
  return categoryDisplayNameMap[category] || category;
}

export function getMonthNumber(month: string): number {
  const months: { [key: string]: number } = {
    "jan": 0, "feb": 1, "mar": 2, "apr": 3, "may": 4, "jun": 5,
    "jul": 6, "aug": 7, "sep": 8, "oct": 9, "nov": 10, "dec": 11
  };
  return months[month.toLowerCase()] || 0;
}