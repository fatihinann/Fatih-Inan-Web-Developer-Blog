'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Mail, Phone, MapPin, Send, Github, Instagram, Headphones, Film } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

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

    <div className="min-h-screen bg-gradient-theme">
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className='space-y-8'
          >
            <Card className="border-border shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-foreground">
                  {t('contact.message.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.message.name')}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-border focus:border-primary focus:ring-primary"
                      placeholder={t('contact.message.namePlaceHolder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.message.email')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-border focus:border-primary focus:ring-primary"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.message.message')}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="border-border focus:border-primary focus:ring-primary"
                      placeholder={t('contact.message.messagePlaceholder')}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? t('contact.sending') : t('contact.message.send')}
                  </Button>
                </form>
              </CardContent>
            </Card>
            {/* Nature Illustration */}
            <Card className="border-border bg-gradient-to-br from-secondary to-accent">
              <CardContent className="p-8 text-center space-y-4">
                <p className="text-muted-foreground italic">
                  {t('contact.contactInfo.cta')}
                </p>
                <div className="text-8xl">🌲</div>
              </CardContent>
            </Card>
          </motion.div>

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
    </div>
  );
}
