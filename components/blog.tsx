'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useTranslation } from 'react-i18next';
import { BlogCard } from '../components/ui/blog-card';
import { BlogPostFrontmatter } from '@/lib/blog';

export interface BlogProps {
  posts: BlogPostFrontmatter[];
}

export function Blog({ posts }: BlogProps) {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories = [
    { value: 'all', label: t('blog.filters.all') },
    { value: 'web', label: t('blog.filters.web') },
    { value: 'design', label: t('blog.filters.design') },
    { value: 'personal', label: t('blog.filters.personal') }
  ];

  // Mevcut dildeki postları filtrele
  const currentLanguagePosts = posts.filter(post => post.locale === i18n.language);

  // Kategoriye göre filtrele
  const filteredPosts = selectedCategory === 'all'
    ? currentLanguagePosts
    : currentLanguagePosts.filter(post => post.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    if (selectedCategory === category) {
      return;
    }
    setIsLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsLoading(false), 250);
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

        {/* Blog Posts Count */}
        {isMounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <p className="text-muted-foreground">
              {filteredPosts.length} {t('blog.postsFound')}
            </p>
          </motion.div>
        )}

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
                <SkeletonCard key={`skeleton-${index}`} />
              ))}
            </motion.div>
          ) : (
            isMounted && (
              <motion.div
                key="posts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <motion.div
                      key={`post-${post.slug}-${post.locale}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      whileHover={{ y: -5 }}
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    key="no-posts"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-12"
                  >
                    <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                      {t('blog.noPosts')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('blog.noPostsDescription')}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}