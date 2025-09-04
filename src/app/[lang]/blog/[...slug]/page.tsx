// app/[lang]/blog/[...slug]/page.tsx
import { notFound } from 'next/navigation';
import { getBlogPost } from '@/lib/blog';
import { getCategoryDisplayName } from '@/lib/blogUtils';
import BlogPostClient from './BlogPostClient'; // Client side bileşeni
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    lang: string;
    slug: string[];
  }>;
}

// Metadata generate function
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  
  if (!slug || slug.length < 2) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const combinedSlug = slug.join('/');
  const post = await getBlogPost(lang, combinedSlug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  const { frontmatter } = post;

  return {
    title: `${frontmatter.title} - Fatih İnan Blog`,
    description: frontmatter.excerpt,
    keywords: frontmatter.tags?.join(', '),
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: 'article',
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      images: frontmatter.image ? [frontmatter.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: frontmatter.image ? [frontmatter.image] : undefined,
    },
  };
}

// Sunucuda çalışır
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;
  
  if (!slug || slug.length < 2) {
    notFound();
  }

  const combinedSlug = slug.join('/');
  const post = await getBlogPost(lang, combinedSlug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const displayName = getCategoryDisplayName(frontmatter.category);
  const category = slug[0]; // İlk slug kategori
  const postSlug = slug[1]; // İkinci slug post

  return (
    <BlogPostClient
      initialPost={{ frontmatter, content }}
      initialDisplayName={displayName}
      lang={lang}
      slug={postSlug}
      category={category}
    />
  );
}