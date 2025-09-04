'use client';

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { useTranslation } from "react-i18next";
import { BlogPostFrontmatter } from '@/lib/blog';
import { getCategoryDisplayName, categoryMap, slugMap } from "@/lib/blogUtils";

export interface BlogCardProps {
  post: BlogPostFrontmatter;
}

export function BlogCard({ post }: BlogCardProps) {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;

  // Post'un kendi locale'ini kontrol et, eğer yoksa current lang'i kullan
  const postLocale = post.locale || currentLang;
  
  // Eğer post farklı bir dildeyse ve mevcut dil değilse, link oluştururken dikkat et
  const shouldTranslate = postLocale !== currentLang;
  
  let translatedCategory = post.category;
  let translatedSlug = post.slug;
  
  if (shouldTranslate) {
    translatedCategory = categoryMap[post.category] || post.category;
    translatedSlug = slugMap[post.slug] || post.slug;
  }

  const href = `/${currentLang}/blog/${post.slug}`;

  return (
    <Link href={href}>
      <Card className="cursor-pointer border-border hover:shadow-xl transition-all duration-300 overflow-hidden h-full hover:border-primary">
        <CardHeader>
          <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border-primary/20">
            {getCategoryDisplayName(post.category)}
          </Badge>
          <CardTitle className="text-xl font-serif text-foreground group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground line-clamp-3">
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {post.date?.day} {post.date?.month ? t(`${post.date.month.toLowerCase()}`) : ''} {post.date?.year}
            </span>
            <span>
              {post.readTime} {t('blog.min')}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}