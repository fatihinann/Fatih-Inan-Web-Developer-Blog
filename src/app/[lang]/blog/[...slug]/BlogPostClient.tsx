'use client'

import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Badge } from '@/../components/ui/badge'
import { Button } from '@/../components/ui/button'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { useTranslation } from 'react-i18next'
import { getMonthNumber } from '@/lib/blogUtils'
import { useEffect, useState } from 'react';

// Markdown bileşenleri aynı kalıyor
const MarkdownComponents = {
  // `p` bileşeni, ana metin için normal kalmalı
  p: ({ children }: any) => (
    <p className="text-muted-foreground leading-relaxed text-lg">
      {children}
    </p>
  ),
  // `img` bileşeni, doğrudan `div` döndürerek hydration sorununu çözer
  img: ({ src, alt }: any) => (
    <div className="relative w-full h-[200px] md:h-[250px] lg:h-[300px] rounded-xl overflow-hidden shadow-lg">
      <Image
        src={src}
        alt={alt || ''}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  ),
  h1: ({ children }: any) => (<h1 className="text-4xl font-bold text-foreground mb-6 mt-8 first:mt-0">{children}</h1>),
  h2: ({ children }: any) => (<h2 className="text-3xl font-semibold text-foreground mt-8 mb-4 border-b border-border pb-2">{children}</h2>),
  h3: ({ children }: any) => (<h3 className="text-2xl font-semibold text-foreground mt-6 mb-3">{children}</h3>),
  h4: ({ children }: any) => (<h4 className="text-xl font-semibold text-foreground mt-4 mb-2">{children}</h4>),
  ul: ({ children }: any) => (<ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2 ml-4">{children}</ul>),
  ol: ({ children }: any) => (<ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2 ml-4">{children}</ol>),
  li: ({ children }: any) => (<li className="text-muted-foreground text-lg">{children}</li>),
  strong: ({ children }: any) => (<strong className="text-foreground font-semibold">{children}</strong>),
  blockquote: ({ children }: any) => (<blockquote className="border-l-4 border-primary pl-6 italic bg-secondary/50 p-4 rounded-r-lg my-6 text-foreground">{children}</blockquote>),
  code: ({ children, className }: any) => {
    if (!className) {
      return (<code className="bg-secondary px-2 py-1 rounded text-sm text-primary font-mono">{children}</code>);
    }
    return (<div className="my-6"><pre className="bg-secondary p-4 rounded-lg overflow-x-auto border border-border"><code className="text-sm text-foreground font-mono">{children}</code></pre></div>);
  },
  table: ({ children }: any) => (<div className="overflow-x-auto my-6"><table className="w-full border-collapse border border-border rounded-lg">{children}</table></div>),
  th: ({ children }: any) => (<th className="border border-border p-3 bg-secondary text-left font-semibold text-foreground">{children}</th>),
  td: ({ children }: any) => (<td className="border border-border p-3 text-muted-foreground">{children}</td>),
  a: ({ children, href }: any) => (<a href={href} className="text-primary hover:text-primary/80 underline transition-colors font-medium" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</a>),
  hr: () => (<hr className="border-border my-8" />),
};

export interface BlogPostClientProps {
  initialPost: {
    frontmatter: any;
    content: string;
  };
  initialDisplayName: string;
  lang: string;
  slug: string;
  category: string;
}

export default function BlogPostClient({ initialPost, initialDisplayName, lang, category, slug }: BlogPostClientProps) {
  const { t, i18n } = useTranslation();
  const { frontmatter, content } = initialPost;

  // Yeni fonksiyon: Markdown içeriğini işleyip bileşenler halinde ayırmak için
  const processMarkdownContent = (markdownContent: string) => {
    const blocks = markdownContent.split(/(<split-right>[\s\S]*?<\/split-right>|<split-left>[\s\S]*?<\/split-left>)/g).filter(Boolean);
    const renderedBlocks: React.ReactNode[] = [];

    blocks.forEach((block, index) => {
      if (block.startsWith('<split-right>')) {
        const innerContent = block.replace(/<\/?split-right>/g, '').trim();
        const imgMatch = innerContent.match(/!\[.*?\]\(.*?\)/);
        const imgMarkdown = imgMatch ? imgMatch[0] : '';
        const textMarkdown = innerContent.replace(imgMarkdown, '').trim();

        renderedBlocks.push(
          <div key={`split-right-${index}`} className="grid md:grid-cols-2 gap-8 items-center my-12">
            <div className="space-y-4 order-2 md:order-1">
              <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                {textMarkdown}
              </ReactMarkdown>
            </div>
            <div className="order-1 md:order-2">
              <ReactMarkdown
                components={MarkdownComponents}
                remarkPlugins={[remarkGfm]}
                // Bu kısım, asıl çözümü içeriyor
                allowedElements={['img']} // Sadece img etiketine izin ver
                unwrapDisallowed={true}  // Diğer tüm etiketleri (p gibi) sarmalayıcılarından ayır
              >
                {imgMarkdown}
              </ReactMarkdown>
            </div>
          </div>
        );
      } else if (block.startsWith('<split-left>')) {
        const innerContent = block.replace(/<\/?split-left>/g, '').trim();
        const imgMatch = innerContent.match(/!\[.*?\]\(.*?\)/);
        const imgMarkdown = imgMatch ? imgMatch[0] : '';
        const textMarkdown = innerContent.replace(imgMarkdown, '').trim();

        renderedBlocks.push(
          <div key={`split-left-${index}`} className="grid md:grid-cols-2 gap-8 items-center my-12">
            <div className="order-1">
              <ReactMarkdown
                components={MarkdownComponents}
                remarkPlugins={[remarkGfm]}
                // Bu kısım, asıl çözümü içeriyor
                allowedElements={['img']}
                unwrapDisallowed={true}
              >
                {imgMarkdown}
              </ReactMarkdown>
            </div>
            <div className="space-y-4 order-2">
              <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                {textMarkdown}
              </ReactMarkdown>
            </div>
          </div>
        );
      } else {
        if (block.trim().length > 0) {
          renderedBlocks.push(
            <ReactMarkdown key={`text-${index}`} components={MarkdownComponents} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
              {block}
            </ReactMarkdown>
          );
        }
      }
    });

    return renderedBlocks;
  };

  const formattedDate = new Date(
    frontmatter.date.year,
    getMonthNumber(frontmatter.date.month) - 1,
    frontmatter.date.day
  ).toLocaleDateString(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 pt-12">
          <Link href={`/${lang}/blog`}>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('blog.backToBlog')}
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          <div>
            <Badge
              className="mb-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
            >
              {initialDisplayName}
            </Badge>

            <h1 className="text-4xl lg:text-5xl font-serif text-foreground mb-4 leading-tight">
              {frontmatter.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {frontmatter.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{frontmatter.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={`${frontmatter.date.year}-${frontmatter.date.month}-${frontmatter.date.day}`}>
                  {formattedDate}
                </time>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{frontmatter.readTime} {t('blog.min')}</span>
              </div>
            </div>

            {frontmatter.tags && (
              <div className="flex flex-wrap gap-2 mb-8">
                {frontmatter.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {frontmatter.image && (
            <div className="relative h-[300px] lg:h-[400px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none prose-img:mb-6">
            {processMarkdownContent(content)}
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif text-foreground mb-4">
                {t('blog.footer.title')}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t('blog.footer.description')}
              </p>
              <Link href={`/${lang}/blog`}>
                <Button className="bg-primary hover:bg-primary/90">
                  {t('blog.footer.exploreButton')}
                </Button>
              </Link>
            </div>

            <div className="bg-secondary/50 rounded-xl p-6 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    {frontmatter.author}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {t('blog.author.job')}
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    {t('blog.author.bio')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}