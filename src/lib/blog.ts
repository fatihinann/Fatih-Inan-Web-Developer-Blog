'use server'

import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'

export async function getBlogPost(locale: string, slug: string[]) {
  try {
    const [urlCategory, urlSlug] = slug

    // İstenen dildeki dosya yolu
    const mdFilePath = join(process.cwd(), 'src/content/blog', locale, urlCategory, `${urlSlug}.md`)
    
    if (existsSync(mdFilePath)) {
      const fileContent = readFileSync(mdFilePath, 'utf8')
      const { data: frontmatter, content } = matter(fileContent)
      return { frontmatter, content }
    }
    
    // İstenen dilde dosya yoksa, Türkçe'ye dön
    if (locale !== 'tr') {
      const trFilePath = join(process.cwd(), 'src/content/blog', 'tr', urlCategory, `${urlSlug}.md`)
      if (existsSync(trFilePath)) {
        const fileContent = readFileSync(trFilePath, 'utf8')
        const { data: frontmatter, content } = matter(fileContent)
        return { frontmatter, content }
      }
    }
    
    return null
  } catch (error) {
    console.error('Blog post okuma hatası:', error)
    return null
  }
}