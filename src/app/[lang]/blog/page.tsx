import { getAllBlogPosts } from '@/lib/blog';
import { Blog } from "@/../components/blog";
import { Metadata } from "next";
import Script from 'next/script';

interface BlogPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params; 
  const canonicalUrl = `https://fatihinan.com/${lang}/blog`;
  
  return {
    title: "Blog - Fatih İnan | Web Geliştirme ve Teknoloji Yazıları",
    description: "Web geliştirme, programlama, teknoloji ve kişisel deneyimler hakkında yazılar.",
    keywords: "web geliştirme blog, programlama, React, Next.js, JavaScript, teknoloji yazıları, Fatih İnan blog",
    openGraph: {
      title: "Blog - Fatih İnan | Web Geliştirme ve Teknoloji Yazıları",
      description: "Web geliştirme, programlama ve teknoloji hakkında güncel yazılar",
      type: "website",
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog - Fatih İnan | Web Geliştirme ve Teknoloji Yazıları",
      description: "Web geliştirme, programlama ve teknoloji hakkında güncel yazılar",
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// BlogPage'i sunucu bileşeni olarak bırakıyoruz
export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params; // params'ı await et
  const allPosts = await getAllBlogPosts(); // Tüm blog yazılarını oku
   
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Fatih İnan Blog",
    "description": "Web geliştirme, programlama, teknoloji ve kişisel deneyimler hakkında yazılar",
    "url": `https://fatihinan.com/${lang}/blog`,
    "author": {
      "@type": "Person",
      "name": "Fatih İnan",
      "url": "https://fatihinan.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Fatih İnan"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://fatihinan.com/${lang}/blog`
    }
  };
   
  return (
    <>
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Blog posts={allPosts} />
    </>
  );
}