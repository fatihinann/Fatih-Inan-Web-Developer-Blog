'use client';

import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useTypewriter } from '../src/hooks/useTypewriter';
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();
  const fullText = t('hero.description');
  const { displayText } = useTypewriter(fullText, 50);

  return (
    <div className="hero-theme relative min-h-screen flex items-center justify-center overflow-hidden" style={{
      background: `linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-middle), var(--bg-gradient-end))`
    }}>
      {/* Background with wood texture effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 40c0-11 9-20 20-20s20 9 20 20v20c0 11-9 20-20 20s-20-9-20-20zm40 0c0-11 9-20 20-20s20 9 20 20v20c0 11-9 20-20 20s-20-9-20-20z' fill='%23d2691e' fill-opacity='0.1'/%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-amber-900 mb-6 leading-tight">
            {t('hero.title')}{' '}
            <span className="text-orange-700">Fatih</span>
            <br />
            <span className="text-ring">{t('hero.subtitle')}</span>
          </h1>

          {/* Typewriter Subtitle */}
          <div className="mb-8 h-16 flex items-center justify-center">
            <p className="text-xl md:text-2xl text-amber-800 font-light">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="inline-block w-0.5 h-6 bg-amber-800 ml-1"
              />
            </p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          >
            <Link href="/blog">
              <Button
                size="lg"
                className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('hero.cta')}
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating elements for visual interest */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-orange-200 opacity-30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-amber-200 opacity-40"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ChevronDown className="h-6 w-6 text-amber-700" />
      </motion.div>
    </div>
  );
}
