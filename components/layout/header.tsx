// Modern header with wood aesthetic and scroll shadow animation

'use client';

import { motion } from 'framer-motion';
import { Github, Instagram, Film } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScroll } from '../../src/hooks/useScroll';
import { ThemeToggle } from '../ThemeToggle';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';


export function Header() {
  const pathname = usePathname();
  const { isScrolled } = useScroll();
  const { t } = useTranslation();

  const navigation = [
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.blog'), href: '/blog' },
    { name: t('navigation.hobbies'), href: '/hobbies' },
    { name: t('navigation.contact'), href: '/contact' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/fatihinann', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/fatihinann7/#', label: 'Instagram' },
    { icon: Film , href: 'https://letterboxd.com/fatihinan7/', label: 'Letterboxd' }
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg bg-white/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Signature */}
          <Link href="/">
            <motion.div
              className="text-2xl font-serif text-amber-800 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              Fatih İnan
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    pathname === item.href
                      ? 'text-slate-700 border-b-2 border-slate-700'
                      : 'text-amber-700 hover:text-slate-700'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-amber-700 hover:text-slate-700 hover:bg-amber-50"
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
