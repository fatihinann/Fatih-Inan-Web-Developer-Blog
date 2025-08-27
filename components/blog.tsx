'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useTranslation } from 'react-i18next';
import { BlogCard } from '../components/ui/blog-card';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: {
    tr: string;
    en: string;
  };
  category: {
    tr: string;
    en: string;
  };
  date: {
    day: string;
    month: string;
    year: string;
  };
  readTime: string;
  image: string;
}

export function Blog() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: "all", label: t('blog.filters.all') },
    { value: "web", label: t('blog.filters.web') },
    { value: "design", label: t('blog.filters.design') },
    { value: "personal", label: t('blog.filters.personal') }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'blog.posts.web.post1.title',
      excerpt: 'blog.posts.web.post1.description',
      slug: {
        tr: 'modern-web-gelistirme',
        en: 'modern-web-development'
      },
      category: {
        tr: 'web',
        en: 'web'
      },
      date: {
        day: '15',
        month: 'blog.posts.months.mar',
        year: '2024'
      },
      readTime: `8`,
      image: '/assets/images/default.svg'
    },
    {
      id: '2',
      title: 'blog.posts.web.post2.title', 
      excerpt: 'blog.posts.web.post2.description',
      slug: {
        tr: 'yazilimda-ilk-is-tecrubesi',
        en: 'found-job-in-software-development'
      },
      category: {
        tr: 'web',
        en: 'web'
      },
      date: {
        day: '3',
        month: 'blog.posts.months.jun',
        year: '2025'
      },
      readTime: `5`,
      image: '/assets/images/default.svg'
    },
    {
      id: '3',
      title: 'blog.posts.design.post1.title',
      excerpt: 'blog.posts.design.post1.description',
      slug: {
        tr: 'arayuz-tasarim-prensipleri',
        en: 'ui-design-principles'
      },
      category: {
        tr: 'tasarim',
        en: 'design'
      },
      date: {
        day: '9',
        month: 'blog.posts.months.nov',
        year: '2024'
      },
      readTime: '10',
      image: '/assets/images/default.svg'
    },
    {
      id: '4',
      title: 'blog.posts.design.post2.title',
      excerpt: 'blog.posts.design.post2.description',
      slug: {
        tr: 'kullanici-deneyimi',
        en: 'user-experience'
      },
      category: {
        tr: 'tasarim',
        en: 'design'
      },
      date: {
        day: '26',
        month: 'blog.posts.months.aug',
        year: '2025'
      },
      readTime: '12',
      image: '/assets/images/default.svg'
    },
    {
      id: '5',
      title: 'blog.posts.personal.post1.title',
      excerpt: 'blog.posts.personal.post1.description',
      slug: {
        tr: 'turkiyede-en-iyi-rotalar',
        en: 'best-routes-in-turkey'
      },
      category: {
        tr: 'kisisel',
        en: 'personal'
      },
      date: {
        day: '21',
        month: 'blog.posts.months.aug',
        year: '2025'
      },
      readTime: '4',
      image: '/assets/images/default.svg'
    },
    {
      id: '6',
      title: 'blog.posts.personal.post2.title',
      excerpt: 'blog.posts.personal.post2.description',
      slug: {
        tr: 'seyahat-ipuclari',
        en: 'travel-tips'
      },
      category: {
        tr: 'kisisel',
        en: 'personal'
      },
      date: {
        day: '8',
        month: 'blog.posts.months.apr',
        year: '2025'
      },
      readTime: '3',
      image: '/assets/images/default.svg'
    }
  ];

  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'tr' | 'en';

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category[currentLang] === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300);
  };

  const SkeletonCard = () => (
    <Card className="border-border">
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
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Blog
            </motion.span>
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => handleCategoryChange(category.value)}
              className={`transition-all duration-200 ${selectedCategory === category.value
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                : 'border-primary text-primary hover:bg-primary/10'
                }`}
            >
              {category.label}
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
                >
                  <BlogCard post={post} />
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
              className="border-primary text-primary hover:bg-primary/10"
            >
              {t('more')}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
