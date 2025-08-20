'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '../../components/hero';
import Script from 'next/script';

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Fatih İnan",
    "jobTitle": "Web Geliştirici",
    "description": "Web geliştirme, programlama, teknoloji, kamp ve motosiklet tutkusu ile dolu bir dünya.",
    "url": "https://fatihinan.com",
    "sameAs": [
      "https://github.com/fatihinan",
      "https://instagram.com/fatihinan",
      "https://letterboxd.com/fatihinan"
    ],
    "knowsAbout": [
      "Web Development",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Frontend Development"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "İstanbul",
      "addressCountry": "TR"
    },
    "email": "fatih@fatihinan.com"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
          >
            <Hero />
          </motion.div>
        </AnimatePresence>
      </main>

      
    </div>
  );
}


