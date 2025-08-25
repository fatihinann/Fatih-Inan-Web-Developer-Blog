'use client'
import React from 'react';
import Link from 'next/link';
import { Github, Instagram, Mail, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const navigation = [
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.blog'), href: '/blog' },
    { name: t('navigation.hobbies'), href: '/hobbies' },
    { name: t('navigation.contact'), href: '/contact' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/fatihinann', label: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com/fatihinann7', label: 'Instagram' },
    { icon: Mail, href: 'mailto:fatih@fatihinan3437@gmail.com', label: 'Email' },
    { icon: ExternalLink, href: 'https://letterboxd.com/fatihinan7', label: 'Letterboxd' }
  ];

  return (
    <footer className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif text-primary mb-4">Fatih İnan</h3>
            <p className="text-foreground mb-4 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">{t('footer.pages')}</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">{t('footer.contact')}</h4>
            <div className="space-y-2 text-foreground">
              <p>{t('footer.jobTitle')}</p>
              <p>{t('footer.location')}</p>
              <a
                href="mailto:fatih@fatihinan3437@gmail.com"
                className="hover:text-primary transition-colors"
              >
                fatihinan3437@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-muted mt-8 pt-8 text-center text-footer-muted">
          <p>&copy; {currentYear} Fatih İnan. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};
