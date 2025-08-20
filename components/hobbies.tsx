'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ExternalLink, Camera, MapPin, Heart } from 'lucide-react';

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
  const hobbies: Hobby[] = [
    {
      id: '1',
      title: 'Kamp Yaşamı',
      description: 'Doğayla iç içe geçirdiğim zamanlar, yıldızlar altında uyumak ve sabah kuş sesleriyle uyanmak.',
      category: 'Doğa',
      image: '/assets/images/default.svg',
      location: 'Karadeniz Bölgesi',
    },
    {
      id: '2',
      title: 'Motosiklet',
      description: 'Yeni rotalar keşfetmek, özgürlük hissi ve yolda geçirilen unutulmaz anlar.',
      category: 'Macera',
      image: '/assets/images/default.svg',
/*       location: 'Türkiye Geneli',
 */      socialLink: {
        platform: 'Strava',
        url: '#',
        label: 'Rota Kayıtları'
      }
    },
    {
      id: '3',
      title: 'Doğa Fotoğrafçılığı',
      description: 'Doğanın güzelliklerini fotoğraflayarak ölümsüzleştirmek ve bu anları paylaşmak.',
      category: 'Sanat',
      image: '/assets/images/default.svg',
/*       location: 'Çeşitli Lokasyonlar'
 */    },
    {
      id: '4',
      title: 'Dizi & Film, Müzik',
      description: 'Sinema tutkusu, farklı türlerden filmler ve bu deneyimleri değerlendirmek.',
      category: 'Kültür',
      image: '/assets/images/default.svg',
      socialLink: {
        platform: 'Letterboxd',
        url: 'https://letterboxd.com/fatihinan7/',
        label: 'Dizi & Film'
      },
      socialLink2: {
        platform: 'Spotify',
        url: 'https://open.spotify.com/user/9bzqbbvmwejng66cjprp9fqvb',
        label: 'Müzik Listem'
      }
    },
    {
      id: '5',
      title: 'Fitness / Calisthenics',
      description: 'Şehir içi ve doğa bisiklet turları, hem spor hem de keşif için mükemmel.',
      category: 'Spor',
      image: '/assets/images/default.svg',
      /*       location: 'İstanbul ve Çevresi',
       */
    },
    {
      id: '6',
      title: 'Tasarım',
      description: 'İçimden geldiği gibi şekillenen tasarımlar.',
      category: 'Tasarım',
      image: '/assets/images/default.svg',
/*       location: 'İstanbul'
 */    }
  ];

  const [showAll, setShowAll] = useState(false);
  const visibleHobbies = showAll ? hobbies : hobbies.slice(0, 3);

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
            Hobilerim
          </h1>
          <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hayatımı renklendiren aktiviteler ve tutkularım
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
            Takip Edebileceğiniz Platformlar
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://letterboxd.com/fatihinan7/"
              target="_blank"
              rel="noopener noreferrer"
              >
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 cursor-pointer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Letterboxd - Film Listem
              </Button>
            </a>
            <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
              <ExternalLink className="w-4 h-4 mr-2" />
              Strava - Aktivitelerim
            </Button>
            <a
              href="https://www.instagram.com/fatihinann7/"
              target="_blank"
              rel="noopener noreferrer"
              >
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 cursor-pointer">
                <Camera className="w-4 h-4 mr-2" />
                Instagram - Fotoğraflarım
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
                        {hobby.category === 'Doğa' && '🏕️'}
                        {hobby.category === 'Macera' && '🏍️'}
                        {hobby.category === 'Sanat' && '📸'}
                        {hobby.category === 'Kültür' && '🎬'}
                        {hobby.category === 'Spor' && '🏋️'}
                        {hobby.category === 'Tasarım' && '🎨'}
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
                        {hobby.category}
                      </Badge>
                    </div>

                    {/* Location */}
                    {hobby.location && (
                      <div className="absolute bottom-4 left-4 flex items-center text-white bg-black/50 px-2 py-1 rounded text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {hobby.location}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <CardTitle className="text-xl font-serif text-slate-700 mb-3 group-hover:text-amber-800 transition-colors">
                      {hobby.title}
                    </CardTitle>

                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {hobby.description}
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
                          {hobby.socialLink.label}
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
                          {hobby.socialLink2.label}
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
            {showAll ? 'Daha Az Göster' : 'Daha Fazla Göster'}
          </Button>
        </div>
      </div>
    </div>
  );
}
