import { notFound } from 'next/navigation'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Badge } from '@/../components/ui/badge'
import { Button } from '@/../components/ui/button'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

interface BlogPostProps {
  params: Promise<{
    slug: string[]
  }>
}

// Markdown dosyasını oku ve parse et
async function getBlogPost(slug: string, locale: string = 'tr') {
  try {
    // Gelen URL'den kategori ve slug'ı al (TR veya EN olabilir)
    const [urlCategory, urlSlug] = slug.split('/')

    // Doğru dosya konumunu bul (MD dosyaları dil klasörlerinde)
    const mdFilePath = join(process.cwd(), 'src/content/blog', locale, urlCategory, `${urlSlug}.md`)
    
    // İstenen dilde dosya varsa oku
    if (existsSync(mdFilePath)) {
      const fileContent = readFileSync(mdFilePath, 'utf8')
      const { data: frontmatter, content } = matter(fileContent)
      return {
        frontmatter,
        content
      }
    }
    
    // İstenen dilde yoksa ve İngilizce istenmişse Türkçe'ye dön
    if (locale === 'en') {
      return getBlogPost(slug, 'tr')
    }
    
    // Hiçbir dilde bulunamazsa null dön
    return null
  } catch (error) {
    console.error('Blog post okuma hatası:', error)
    return null
  }
}

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

type CategoryInfo = {
  locale: string;
  display: string;
}

type CategoryMap = {
  [key: string]: CategoryInfo;
}

const getCategoryInfo = async (params: BlogPostProps['params']) => {
  const resolvedParams = await params
  const category = resolvedParams.slug[0]
  
  // Kategori dil eşleşmeleri
  const categoryMap: CategoryMap = {
    // İngilizce kategoriler
    'web': { locale: 'en', display: 'Web Development' },
    'design': { locale: 'en', display: 'Design' },
    'personal': { locale: 'en', display: 'Personal' },
    // Türkçe kategoriler
    'web-gelistirme': { locale: 'tr', display: 'Web Geliştirme' },
    'tasarim': { locale: 'tr', display: 'Tasarım' },
    'kisisel': { locale: 'tr', display: 'Kişisel' },
  }

  return {
    slug: resolvedParams.slug.join('/'),
    category,
    locale: categoryMap[category]?.locale || 'tr',
    displayName: categoryMap[category]?.display || category
  }
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug, locale, displayName } = await getCategoryInfo(params)
  const post = await getBlogPost(slug, locale)

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
              Blog'a Dön
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Badge 
              className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
            >
              {displayName}
            </Badge>
            
            <h1 className="text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
              {frontmatter.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {frontmatter.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{frontmatter.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={frontmatter.date}>
                  {new Date(frontmatter.date).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{frontmatter.readTime} dk okuma</span>
              </div>
            </div>

            {/* Tags */}
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

          {/* Featured Image */}
          {frontmatter.image && (
            <div className="relative h-[300px] lg:h-[500px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
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

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
              components={MarkdownComponents}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif text-foreground mb-4">
                Bu yazıyı beğendiniz mi?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Benzer içerikler için blog sayfamı takip edebilir, yeni yazılardan haberdar olmak için sosyal medya hesaplarımı ziyaret edebilirsiniz.
              </p>
              <Link href="/blog">
                <Button className="bg-primary hover:bg-primary/90">
                  Diğer Yazıları Keşfet
                </Button>
              </Link>
            </div>

            {/* Author Box */}
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
                    Web Developer & Motosiklet Tutkunu
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Teknoloji ve doğa arasında denge kurarak, hem kod yazıyor hem de yeni rotalar keşfediyorum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

// SEO için metadata generate et
export async function generateMetadata({ params }: BlogPostProps) {
  const { slug, locale } = await getCategoryInfo(params)
  
  const post = await getBlogPost(slug, locale)

  if (!post) {
    return {
      title: 'Blog yazısı bulunamadı'
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
        {
          url: frontmatter.image,
          alt: frontmatter.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: frontmatter.image ? [frontmatter.image] : [],
    }
  }
}