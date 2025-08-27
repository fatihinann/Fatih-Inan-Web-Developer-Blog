import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export async function getBlogPost(slug: string, locale: string = 'tr') {
  try {
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
