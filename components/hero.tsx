'use client';

import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useTypewriter } from '../src/hooks/useTypewriter';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import banner from '../public/assets/images/blog/banner.webp';

export function Hero() {
  const { t } = useTranslation();
  const fullText = t('hero.description');
  const { displayText } = useTypewriter(fullText, 50);
  const params = useParams();
  const lang = params?.lang || 'tr';

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/10 blur-[120px] dark:bg-amber-500/5" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/10 blur-[120px] dark:bg-orange-500/5" />
      </div>
      {/* Background with banner image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${banner.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
          opacity: .7,
        }}></div>
        {/* Modern Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-background/40 dark:bg-background/80 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-[1.1] tracking-tight">
            <span className="text-foreground">{t('hero.title')}, </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500">
              Fatih
            </span>
            <br />
            <span className="text-muted-foreground text-3xl md:text-5xl font-sans font-light mt-4 block italic">
              {t('hero.subtitle')}
            </span>
          </h1>

          {/* Typewriter Subtitle */}
          <div className="mb-8 h-16 flex items-center justify-center">
            <p className="text-xl md:text-2xl text-foreground/80 font-light">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="inline-block w-0.5 h-6 bg-amber-500 ml-1"
              />
            </p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            <Link href={`/${lang}/blog`}>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground px-10 py-7 text-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/20 rounded-2xl"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>


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
        <ChevronDown className="h-10 w-10 text-primary opacity-50" />
      </motion.div>
    </div>
  );
}
