'use client';


import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Mail, MapPin, Github, Instagram, Headphones, Film } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Contact() {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Mail,
      label: 'contact.message.email',
      value: 'fatihinan3437@gmail.com',
      href: 'mailto:fatihinan3437@gmail.com'
    },
    {
      icon: MapPin,
      label: 'contact.contactInfo.labelLocation',
      value: 'contact.contactInfo.location',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      platform: 'GitHub',
      url: 'https://github.com/fatihinann',
      username: '@fatihinann'
    },
    {
      icon: Instagram,
      platform: 'Instagram',
      url: 'https://www.instagram.com/fatihinann7/#',
      username: '@fatihinann7'
    },
    {
      icon: Film,
      platform: 'Letterboxd',
      url: 'https://letterboxd.com/fatihinan7/',
      username: '@fatihinan7'
    },
    {
      icon: Headphones,
      platform: 'Spotify',
      url: 'https://open.spotify.com/user/9bzqbbvmwejng66cjprp9fqvb',
      username: '@fatihinann7'
    }
  ];

  return (

    <section id="contact" className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
            {t('contact.title')}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Info and Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-foreground">
                  {t('contact.contactInfo.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="bg-primary/10 p-2 rounded-full">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t(info.label)}</p>
                      <a
                        href={info.href}
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {t(info.value)}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>


          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="space-y-8"
          >
            {/* Social Media Links */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-foreground">
                  {t('contact.contactInfo.socials')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary/50 transition-all duration-200 group"
                    >
                      <div className="bg-primary/10 group-hover:bg-primary/20 p-2 rounded-full transition-colors">
                        <social.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {social.platform}
                        </p>
                        <p className="text-sm text-muted-foreground">{social.username}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
