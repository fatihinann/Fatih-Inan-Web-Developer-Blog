// components/ui/LanguageSwitcher.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

const LANGUAGE_KEY = 'preferred-language';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  // Kategori ve slug (dosya adı) eşleştirme haritaları
  const categoryMap: Record<string, string> = {
    'web-gelistirme': 'web',
    'web': 'web-gelistirme',
    'tasarim': 'design',
    'design': 'tasarim',
    'kisisel': 'personal',
    'personal': 'kisisel',
  };

  const slugMap: Record<string, string> = {
    'modern-web-gelistirme': 'modern-web-development',
    'modern-web-development': 'modern-web-gelistirme',
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    const initialLang = savedLanguage || 'tr';
    i18n.changeLanguage(initialLang);
  }, [mounted, i18n]);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (lng: string) => {
    if (lng === i18n.language) {
      setIsOpen(false);
      return;
    }

    const segments = pathname.split('/').filter(Boolean);

    // If we are on a blog post page (e.g., /tr/blog/web-gelistirme/modern-web-gelistirme)
    if (segments.length >= 3 && segments[1] === 'blog') {
      const currentCategory = segments[2];
      const currentSlug = segments[3];

      // Attempt to translate the category and slug; use original if no translation exists
      segments[2] = categoryMap[currentCategory] || currentCategory;
      segments[3] = slugMap[currentSlug] || currentSlug;
    }

    // Update the language segment at the beginning of the path
    segments[0] = lng;

    const newPath = '/' + segments.join('/');

    i18n.changeLanguage(lng);
    localStorage.setItem(LANGUAGE_KEY, lng);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-amber-700 hover:text-slate-700 hover:bg-amber-50"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">{currentLanguage.flag}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-amber-200 py-2 z-50"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-amber-50 transition-colors flex items-center space-x-2 ${i18n.language === language.code ? 'bg-amber-100 text-amber-800' : 'text-slate-700'
                  }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}