'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ExternalLink, Camera, MapPin, Github, Headphones, Film } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Hobby {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  location?: string;
  socialLink?: {
    platform: string;
    url: string;
    label: string;
  };
  socialLink2?: {
    platform: string;
    url: string;
    label: string;
  };
}

export function Hobbies() {
  const { t } = useTranslation();

  const hobbies: Hobby[] = [
    {
      id: '1',
      title: 'hobbies.camping.title',
      description: 'hobbies.camping.description',
      category: 'hobbies.categories.nature',
      image: '/assets/images/default.svg',
      // location: 'Karadeniz Bölgesi',
    },
    {
      id: '2',
      title: 'hobbies.motorcycle.title',
      description: 'hobbies.motorcycle.description',
      category: 'hobbies.categories.adventure',
      image: '/assets/images/default.svg',
      // location: 'Türkiye Geneli',
      // socialLink: {
      //   platform: 'Strava',
      //   url: '#',
      //   label: 'Rota Kayıtları'
      // }
    },
    {
      id: '3',
      title: 'hobbies.films&Music.title',
      description: 'hobbies.films&Music.description',
      category: 'hobbies.categories.culture',
      image: '/assets/images/default.svg',
      socialLink: {
        platform: 'Letterboxd',
        url: 'https://letterboxd.com/fatihinan7/',
        label: 'hobbies.films&Music.films'
      },
      socialLink2: {
        platform: 'Spotify',
        url: 'https://open.spotify.com/user/9bzqbbvmwejng66cjprp9fqvb',
        label: 'hobbies.films&Music.music'
      }
    },
    {
      id: '4',
      title: 'hobbies.sports.title',
      description: 'hobbies.sports.description',
      category: 'hobbies.categories.sports',
      image: '/assets/images/default.svg',
      // location: 'Çeşitli Lokasyonlar'
    },
    {
      id: '5',
      title: 'hobbies.photography.title',
      description: 'hobbies.photography.description',
      category: 'hobbies.categories.photography',
      image: '/assets/images/default.svg',
      // location: 'İstanbul ve Çevresi',

    },
    {
      id: '6',
      title: 'hobbies.design.title',
      description: 'hobbies.design.description',
      category: 'hobbies.categories.design',
      image: '/assets/images/default.svg',
      // location: 'İstanbul'
    }
  ];

  const [showAll, setShowAll] = useState(false);
  const visibleHobbies = showAll ? hobbies : hobbies.slice(0, 3);

  return (
    <div className="hobbies-theme min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100" style={{
      background: `linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-middle), var(--bg-gradient-end))`
    }}>
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-serif text-amber-900 mb-6 leading-tight">
            {t('hobbies.title')}
          </h1>
          <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('hobbies.description')}
          </p>
        </motion.div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-serif text-slate-700 mb-6">
            {t('hobbies.platforms')}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/fatihinann"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 cursor-pointer">
                <Github className="w-4 h-4 mr-2" />
                Github
              </Button>
            </a>
            <a
              href="https://www.instagram.com/fatihinann7/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 cursor-pointer">
                <Camera className="w-4 h-4 mr-2" />
                Instagram
              </Button>
            </a>
            <a
              href="https://letterboxd.com/fatihinan7/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 cursor-pointer">
                <Headphones className="w-4 h-4 mr-2" />
                Spotify
              </Button>
            </a>
            <a
              href="https://letterboxd.com/fatihinan7/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 cursor-pointer">
                <Film className="w-4 h-4 mr-2" />
                Letterboxd
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Hobbies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleHobbies.map((hobby, index) => (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <Card className="border-amber-200 hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                <CardContent className="p-0">
                  {/* Image Section */}
                  <div className="relative w-full h-64 bg-gradient-to-br from-amber-100 to-orange-200 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-6xl opacity-60">
                        {hobby.category === 'hobbies.categories.nature' && '🏕️'}
                        {hobby.category === 'hobbies.categories.adventure' && '🏍️'}
                        {hobby.category === 'hobbies.categories.photography' && '📸'}
                        {hobby.category === 'hobbies.categories.culture' && '🎬'}
                        {hobby.category === 'hobbies.categories.sports' && '🏋️'}
                        {hobby.category === 'hobbies.categories.design' && '🎨'}
                      </div>
                    </motion.div>

                    {/* Overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.3 }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-amber-700 border-0">
                        {t(hobby.category)}
                      </Badge>
                    </div>

                    {/* Location */}
                    {hobby.location && (
                      <div className="absolute bottom-4 left-4 flex items-center text-white bg-black/50 px-2 py-1 rounded text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {t(hobby.location)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <CardTitle className="text-xl font-serif text-slate-700 mb-3 group-hover:text-amber-800 transition-colors">
                      {t(hobby.title)}
                    </CardTitle>

                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {t(hobby.description)}
                    </p>

                    {/* Social Links */}
                    <div className="space-x-4 flex">
                      {hobby.socialLink && (
                        <motion.a
                          href={hobby.socialLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 5 }}
                          className="flex items-center text-amber-700 font-medium text-sm hover:text-amber-800 transition-colors cursor-pointer"
                        >
                          {t('hobbies.films&Music.films')}
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </motion.a>
                      )}
                      {hobby.socialLink2 && (
                        <motion.a
                          href={hobby.socialLink2.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 5 }}
                          className="flex items-center text-amber-700 font-medium text-sm hover:text-amber-800 transition-colors cursor-pointer"
                        >
                          {t('hobbies.films&Music.music')}
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? t('less') : t('more')}
          </Button>
        </div>
      </div>
    </div>
  );
}
