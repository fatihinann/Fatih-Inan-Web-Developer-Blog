'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Github, Instagram, Film, Menu, X, Mail } from 'lucide-react';
import { Button } from './button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScroll } from '../../src/hooks/useScroll';
import { ThemeToggle } from '../ThemeToggle';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const params = useParams();
  const lang = params?.lang || 'tr';
  const { isScrolled } = useScroll();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('navigation.about'), href: `/${lang}/about` },
    { name: t('navigation.blog'), href: `/${lang}/blog` },
    { name: t('navigation.hobbies'), href: `/${lang}/hobbies` },
    { name: t('navigation.contact'), href: `/${lang}/contact` }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/fatihinann', label: 'GitHub' },
    { icon: Mail, href: 'mailto:fatihinan3437@gmail.com', label: 'Email' },
    { icon: Instagram, href: 'https://www.instagram.com/fatihinann7/#', label: 'Instagram' }
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`header-theme fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
          isScrolled ? 'shadow-lg backdrop-blur-sm' : ''
        }`}
        style={{
          backgroundColor: isScrolled ? 'var(--background)' : 'transparent',
          opacity: isScrolled ? 0.95 : 1,
          borderBottom: isScrolled ? '1px solid var(--border)' : 'none'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Signature */}
            <Link href="/">
              <motion.div
                className="text-2xl font-serif text-primary cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                Fatih İnan
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`text-sm font-medium transition-colors cursor-pointer ${
                      pathname === item.href
                        ? 'text-foreground border-b-2 border-primary'
                        : 'text-primary hover:text-foreground'
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeToggle />

              <LanguageSwitcher />

              {/* Desktop Social Links */}
              <div className="hidden lg:flex items-center space-x-2">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-primary hover:text-foreground hover:bg-secondary"
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-4 w-4" />
                      <span className="sr-only">{social.label}</span>
                    </a>
                  </Button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-primary hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-50 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-lg font-semibold text-foreground">Menu</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeMobileMenu}
                    className="text-primary hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Navigation Links */}
                <div className="py-6">
                  <nav className="space-y-2 px-6">
                    {navigation.map((item, index) => (
                      <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
                        <motion.div
                          className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                            pathname === item.href
                              ? 'bg-primary/10 text-foreground border-l-4 border-primary'
                              : 'text-primary hover:text-foreground hover:bg-secondary'
                          }`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.name}
                        </motion.div>
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Social Links */}
                <div className="p-6 border-t border-border">
                  <div className="flex justify-center space-x-3">
                    {socialLinks.map((social, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="text-primary hover:text-foreground hover:bg-secondary"
                        >
                          <a href={social.href} target="_blank" rel="noopener noreferrer">
                            <social.icon className="h-4 w-4" />
                            <span className="sr-only">{social.label}</span>
                          </a>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}