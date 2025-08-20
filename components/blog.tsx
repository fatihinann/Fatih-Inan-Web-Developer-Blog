// Blog page with card grid layout and categories

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export function Blog() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['Tümü', 'Web Geliştirme', 'Tasarım', 'Kişisel Yazılar'];

  // Mock blog posts
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Modern Web Uygulamalarında TypeScript Kullanımı',
      excerpt: 'TypeScript ile daha güvenli ve sürdürülebilir web uygulamaları geliştirmenin yolları ve en iyi pratikler.',
      category: 'Web Geliştirme',
      date: '15 Mart 2024',
      readTime: '8 dk',
      image: '/assets/images/default.svg'
    },
    {
      id: '2',
      title: 'Minimalist Tasarım Prensipleri',
      excerpt: 'Daha temiz ve etkili kullanıcı arayüzleri oluşturmak için minimalist tasarım yaklaşımları.',
      category: 'Tasarım',
      date: '10 Mart 2024',
      readTime: '6 dk',
      image: '/assets/images/default.svg'
    },
    {
      id: '3',
      title: 'Kamp Yaşantısından Kod Yazmaya',
      excerpt: 'Doğayla iç içe geçirdiğim zamanların yazılım geliştirme sürecime olan etkilerini keşfettikçe...',
      category: 'Kişisel Yazılar',
      date: '5 Mart 2024',
      readTime: '10 dk',
      image: '/assets/images/default.svg'
    },
    {
      id: '4',
      title: 'React Hook\'larıyla State Yönetimi',
      excerpt: 'Modern React uygulamalarında state yönetimi için hook kullanımı ve performans optimizasyonları.',
      category: 'Web Geliştirme',
      date: '28 Şubat 2024',
      readTime: '12 dk',
      image: '/assets/images/default.svg'
    },
    {
      id: '5',
      title: 'Renk Teorisi ve Web Tasarımı',
      excerpt: 'Web tasarımında renk seçiminin kullanıcı deneyimi üzerindeki etkisi ve pratik uygulamalar.',
      category: 'Tasarım',
      date: '20 Şubat 2024',
      readTime: '7 dk',
      image: '/assets/images/default.svg'
    },
    {
      id: '6',
      title: 'Motosiklet Yolculukları ve Yaratıcılık',
      excerpt: 'Yolda geçen saatler ve keşfedilen yeni yerler, yaratıcı düşünce sürecini nasıl besliyor?',
      category: 'Kişisel Yazılar',
      date: '15 Şubat 2024',
      readTime: '9 dk',
      image: '/assets/images/default.svg'
    }
  ];

  const filteredPosts = selectedCategory === 'Tümü' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300);
  };

  const SkeletonCard = () => (
    <Card className="border-amber-200">
      <CardContent className="p-0">
        <div className="w-full h-48 bg-gray-200 animate-pulse rounded-t-lg"></div>
        <div className="p-6">
          <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="h-6 bg-gray-200 animate-pulse rounded mb-4"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-20"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-16"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Blog
            </motion.span>
          </h1>
          <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('blog.description')}
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className={`transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-slate-700 hover:bg-slate-800 text-white'
                  : 'border-amber-300 text-amber-700 hover:bg-amber-50'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                >
                                     <Card className="border-amber-200 hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <CardContent className="p-0">
                      {/* Image */}
                      <div className="relative w-full h-48 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl text-amber-600">📖</div>
                        </div>
                        <motion.div
                          className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                          whileHover={{ scale: 1.1 }}
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                            {post.category}
                          </Badge>
                          <div className="flex items-center text-xs text-slate-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime}
                          </div>
                        </div>

                        <CardTitle className="text-xl font-serif text-slate-700 mb-3 group-hover:text-amber-800 transition-colors">
                          {post.title}
                        </CardTitle>

                        <p className="text-slate-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-slate-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            {post.date}
                          </div>
                          <motion.div
                            className="flex items-center text-amber-700 font-medium text-sm"
                            whileHover={{ x: 5 }}
                          >
                            Devamını Oku
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More Button */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              {t('blog.loadMore')}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
