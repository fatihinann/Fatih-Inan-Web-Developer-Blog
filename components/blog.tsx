'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BlogDate {
  day: string;
  month: string;
  year: string;
}
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: BlogDate;
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
      category: 'web',
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
      category: 'web',
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
      category: 'design',
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
      category: 'design',
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
      category: 'personal',
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
      category: 'personal',
      date: {
        day: '8',
        month: 'blog.posts.months.apr',
        year: '2025'
      },
      readTime: '3',
      image: '/assets/images/default.svg'
    }
  ];

  const filteredPosts = selectedCategory === 'all'
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
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => handleCategoryChange(category.value)}
              className={`transition-all duration-200 ${selectedCategory === category.value
                ? 'bg-slate-700 hover:bg-slate-800 text-white'
                : 'border-amber-300 text-amber-700 hover:bg-amber-50'
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
                            {t(`blog.filters.${post.category}`)}
                          </Badge>
                          <div className="flex items-center text-xs text-slate-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime} {t('blog.posts.min')}
                          </div>
                        </div>

                        <CardTitle className="text-xl font-serif text-slate-700 mb-3 group-hover:text-amber-800 transition-colors">
                          {t(post.title)}
                        </CardTitle>

                        <p className="text-slate-600 mb-4 line-clamp-3">
                          {t(post.excerpt)}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-slate-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            {post.date.day} {t(post.date.month)} {post.date.year}
                          </div>
                          <motion.div
                            className="flex items-center text-amber-700 font-medium text-sm"
                            whileHover={{ x: 5 }}
                          >
                            {t('readMore')}
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
              {t('loadMore')}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
