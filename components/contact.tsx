'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Mail, Phone, MapPin, Send, Github, Instagram, ExternalLink } from 'lucide-react';

export function Contact() {
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
      label: 'E-posta',
      value: 'fatihinan3437@gmail.com',
      href: 'mailto:fatihinan3437@gmail.com'
    },
    {
      icon: MapPin,
      label: 'Konum',
      value: 'İstanbul, Türkiye',
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
      icon: ExternalLink,
      platform: 'Letterboxd',
      url: 'https://letterboxd.com/fatihinan7/',
      username: '@fatihinan7'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-serif text-amber-900 mb-6 leading-tight">
            İletişim
          </h1>
          <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Benimle iletişime geçin! Yeni projeler, iş birlikleri veya sadece merhaba demek için...
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
            <Card className="border-amber-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-slate-700">
                  Mesaj Gönder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      İsim Soyisim
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      E-posta
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Mesaj
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3 transition-all duration-300"
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
                    {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                  </Button>
                </form>
              </CardContent>
            </Card>
            {/* Nature Illustration */}
            <Card className="border-orange-200 bg-gradient-to-br from-amber-50 to-orange-100">
              <CardContent className="p-8 text-center space-y-4">
                <p className="text-slate-600 italic">
                  &quot;Doğa ile kod arasında köprü kurmaya devam ediyorum&quot;
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
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-slate-700">
                  İletişim Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    <div className="bg-amber-100 p-2 rounded-full">
                      <info.icon className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">{info.label}</p>
                      <a
                        href={info.href}
                        className="font-medium text-slate-700 hover:text-amber-700 transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-slate-700">
                  Sosyal Medya
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
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-amber-50 transition-all duration-200 group"
                    >
                      <div className="bg-amber-100 group-hover:bg-amber-200 p-2 rounded-full transition-colors">
                        <social.icon className="w-5 h-5 text-amber-700" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700 group-hover:text-amber-700 transition-colors">
                          {social.platform}
                        </p>
                        <p className="text-sm text-slate-500">{social.username}</p>
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
