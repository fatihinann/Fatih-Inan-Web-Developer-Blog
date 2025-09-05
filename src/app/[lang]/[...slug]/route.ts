import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

// Blog post içeriğini oku ve parse et
async function getBlogPost(slug: string, locale: string = 'tr') {
  try {
    // Gelen URL'den kategori ve slug'ı al
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

// ✅ Async params ile düzeltilmiş versiyon
export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{ lang: string; slug: string[] }>
  }
) {
  // Params'ı await et
  const { lang, slug } = await context.params
  
  // URL'den locale al, yoksa params'tan lang kullan
  const searchParams = request.nextUrl.searchParams
  const locale = searchParams.get('locale') || lang || 'tr'
  const slugPath = slug.join('/')

  const post = await getBlogPost(slugPath, locale)

  if (!post) {
    return new NextResponse('Not Found', { status: 404 })
  }

  return NextResponse.json(post)
}