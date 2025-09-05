'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Instagram, Mail, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const params = useParams();
  const pathname = usePathname();
  const lang = params?.lang || 'tr';

  const navigation = [
    { name: t('navigation.about'), href: `/${lang}/about` },
    { name: t('navigation.blog'), href: `/${lang}/blog` },
    { name: t('navigation.hobbies'), href: `/${lang}/hobbies` },
    { name: t('navigation.contact'), href: `/${lang}/contact` }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/fatihinann', label: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com/fatihinann7', label: 'Instagram' },
    { icon: Mail, href: 'mailto:fatihinan3437@gmail.com', label: 'Email' }
  ];

  const isActiveLink = (href:string):boolean => {
    return pathname === href;
  };

  return (
    <footer className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${lang}`}>
              <h3 className="text-2xl font-serif text-primary mb-4 hover:opacity-80 transition-opacity cursor-pointer">
                Fatih İnan
              </h3>
            </Link>
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

          <div className='gap-8 sm:gap-0 flex justify-around md:justify-between col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2'>
            {/* Navigation */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-primary">{t('footer.pages')}</h4>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`transition-colors ${
                        isActiveLink(item.href)
                          ? 'text-primary font-medium'
                          : 'text-foreground hover:text-primary'
                      }`}
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
                  href="mailto:fatihinan3437@gmail.com"
                  className="hover:text-primary transition-colors block"
                >
                  fatihinan3437@gmail.com
                </a>
              </div>
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