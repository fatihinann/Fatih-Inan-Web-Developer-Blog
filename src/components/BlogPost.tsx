'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { Badge } from '@/../components/ui/badge'
import { Button } from '@/../components/ui/button'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { useTranslation } from 'react-i18next'

// React Markdown için custom componentler
const MarkdownComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-4xl font-bold text-foreground mb-6 mt-8 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-3xl font-semibold text-foreground mt-8 mb-4 border-b border-border pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-2xl font-semibold text-foreground mt-6 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="text-xl font-semibold text-foreground mt-4 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }: any) => (
    <p className="text-muted-foreground leading-relaxed mb-4 text-lg">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2 ml-4">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2 ml-4">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="text-muted-foreground text-lg">
      {children}
    </li>
  ),
  strong: ({ children }: any) => (
    <strong className="text-foreground font-semibold">
      {children}
    </strong>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-primary pl-6 italic bg-secondary/50 p-4 rounded-r-lg my-6 text-foreground">
      {children}
    </blockquote>
  ),
  code: ({ children, className }: any) => {
    // Inline code
    if (!className) {
      return (
        <code className="bg-secondary px-2 py-1 rounded text-sm text-primary font-mono">
          {children}
        </code>
      )
    }
    
    // Code block
    return (
      <div className="my-6">
        <pre className="bg-secondary p-4 rounded-lg overflow-x-auto border border-border">
          <code className="text-sm text-foreground font-mono">
            {children}
          </code>
        </pre>
      </div>
    )
  },
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-border rounded-lg">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: any) => (
    <th className="border border-border p-3 bg-secondary text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="border border-border p-3 text-muted-foreground">
      {children}
    </td>
  ),
  a: ({ children, href }: any) => (
    <a 
      href={href}
      className="text-primary hover:text-primary/80 underline transition-colors font-medium"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  img: ({ src, alt }: any) => (
    <div className="my-6">
      <Image
        src={src}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg shadow-lg w-full h-auto"
      />
    </div>
  ),
  hr: () => (
    <hr className="border-border my-8" />
  ),
}

interface BlogPostProps {
  params: {
    slug: string[]
  }
}

export default function BlogPost({ params }: BlogPostProps) {
  const { i18n } = useTranslation()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      setLoading(true)
      const slug = params.slug.join('/')
      const locale = i18n.language || 'tr'
      
      // API endpoint'ten içeriği yükle
      const response = await fetch(`/api/blog/${slug}?locale=${locale}`)
      if (!response.ok) {
        notFound()
      }
      const postData = await response.json()
      setPost(postData)
      setLoading(false)
    }

    loadPost()
  }, [params.slug, i18n.language])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  const { frontmatter, content } = post

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8 pt-12">
          <Link href="/blog">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {i18n.language === 'tr' ? 'Blog\'a Dön' : 'Back to Blog'}
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Rest of your existing JSX */}
        </article>
      </div>
    </div>
  )
}
