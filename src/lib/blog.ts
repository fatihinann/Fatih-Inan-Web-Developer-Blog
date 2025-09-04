'use server'

import { getMonthNumber } from './blogUtils'
import { readFileSync, existsSync, readdirSync } from 'fs'
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'

// Blog gönderileri için Frontmatter tipini tanımlıyoruz
export interface BlogPostFrontmatter {
  id: string;
  title: string;
  excerpt: string;
  date: {
    day: number;
    month: string;
    year: number;
  };
  author: string;
  category: string;
  image: string;
  readTime: number;
  locale: string;
  slug: string;
  tags: string[];
}

export interface BlogPost {
  frontmatter: BlogPostFrontmatter;
  content: string;
}

// Belirli bir dil ve slug için tek bir blog yazısını döndürür

export async function getBlogPost(lang: string, combinedSlug: string) {
  if (!lang || !combinedSlug || combinedSlug.includes('undefined')) {
    return null;
  }

  const filePath = path.join(process.cwd(), 'src/content/blog', lang, `${combinedSlug}.md`);

  try {
    if (!existsSync(filePath)) {
      if (lang !== 'tr') {
        const fallbackPath = path.join(process.cwd(), 'src/content/blog', 'tr', `${combinedSlug}.md`);
        if (existsSync(fallbackPath)) {
          const fileContents = fs.readFileSync(fallbackPath, 'utf8');
          const { data: frontmatter, content } = matter(fileContents);
          return {
            frontmatter,
            content,
          };
        }
      }
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    return {
      frontmatter,
      content,
    };
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}
const getFilesRecursively = (dir: string): string[] => {
  const files: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFilesRecursively(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
};

export async function getAllBlogPosts(): Promise<BlogPostFrontmatter[]> {
  let postsDirectory = path.join(process.cwd(), 'content', 'blog');

  if (!fs.existsSync(postsDirectory)) {
    postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');
  }

  if (!fs.existsSync(postsDirectory)) {
    console.warn('Blog content directory not found:', postsDirectory);
    return [];
  }

  const allPosts: BlogPostFrontmatter[] = [];

  try {
    const locales = fs.readdirSync(postsDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const locale of locales) {
      const localePath = path.join(postsDirectory, locale);
      const filePaths = getFilesRecursively(localePath);

      for (const filePath of filePaths) {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter } = matter(fileContents);

        // Slug'ı dosya adından al
        const filename = path.basename(filePath, '.md');
        // Get the full path relative to the locale folder
        const relativePath = path.relative(localePath, filePath);
        // Get the slug from the relative path, removing the .md extension
        const slug = relativePath.replace('.md', '');
        // Kategori adını bulmak için yolu parçala
        const parts = filePath.substring(localePath.length + 1).split(path.sep);
        const category = parts.length > 1 ? parts[0] : frontmatter.category || 'uncategorized';

        allPosts.push({
          ...frontmatter,
          slug,
          locale,
          category,
        } as BlogPostFrontmatter);
      }
    }

    allPosts.sort((a, b) => {
      const dateA = new Date(a.date.year, getMonthNumber(a.date.month), a.date.day);
      const dateB = new Date(b.date.year, getMonthNumber(b.date.month), b.date.day);
      return dateB.getTime() - dateA.getTime();
    });

    console.log(`Loaded ${allPosts.length} blog posts`);
    return allPosts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}