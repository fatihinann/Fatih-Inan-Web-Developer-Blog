'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGE_KEY = 'preferred-language';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  // Hydration için mounting kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sadece ilk girişte dil kontrolü yap
  useEffect(() => {
    if (mounted) {
      const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
      // Sadece localStorage'da dil tercihi yoksa Türkçe'ye çevir
      if (!savedLanguage) {
        i18n.changeLanguage('tr');
        localStorage.setItem(LANGUAGE_KEY, 'tr');
      } else {
        // Kayıtlı dil varsa onu kullan
        i18n.changeLanguage(savedLanguage);
      }
    }
  }, [mounted, i18n]);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem(LANGUAGE_KEY, lng);
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
                className={`w-full px-4 py-2 text-left text-sm hover:bg-amber-50 transition-colors flex items-center space-x-2 ${
                  i18n.language === language.code ? 'bg-amber-100 text-amber-800' : 'text-slate-700'
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
