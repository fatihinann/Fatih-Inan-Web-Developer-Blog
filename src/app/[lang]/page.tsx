'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/../components/hero';
import { PortfolioSection } from '@/../components/portfolio';
import { About } from '@/../components/about';
import { Contact } from '@/../components/contact';
import Script from 'next/script';
import Providers from '../providers';

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
    
    <div className="min-h-screen bg-background">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Providers>
              <Hero />
              <About />
              <PortfolioSection />
              <Contact />
            </Providers>
          </motion.div>
        </AnimatePresence>
      </main>


    </div>
  );
}


