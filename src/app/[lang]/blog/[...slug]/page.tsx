import { notFound } from 'next/navigation'
import { getBlogPost } from '@/lib/blog'
import { getCategoryDisplayName } from '@/lib/blogUtils'
import BlogPostClient from './BlogPostClient'
import { Metadata } from 'next'

interface BlogPostProps {
  params: {
    lang: string
    slug: string[]
  }
}

// Server'da çalışacak olan ana sayfa bileşeni
export default async function BlogPostPage({ params }: BlogPostProps) {
  const { lang, slug } = params
  const post = await getBlogPost(lang, slug)
  
  if (!post) {
    notFound()
  }
  
  const { frontmatter, content } = post
  const displayName = getCategoryDisplayName(frontmatter.category)

  return (
    <BlogPostClient 
      initialPost={{ frontmatter, content }}
      initialDisplayName={displayName}
      lang={lang}
      slug={slug.join('/')}
    />
  )
}

// SEO için metadata generate et (server-side)
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { lang, slug } = params
  const post = await getBlogPost(lang, slug)

  if (!post) {
    return {
      title: 'Blog yazısı bulunamadı',
    }
  }

  const { frontmatter } = post

  return {
    title: `${frontmatter.title} | Fatih İnan Blog`,
    description: frontmatter.excerpt,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      images: frontmatter.image ? [
        { url: frontmatter.image, alt: frontmatter.title },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: frontmatter.image ? [frontmatter.image] : [],
    },
  }
}