import type { Metadata } from "next";
import { Blog } from "../../../components/blog";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Blog - Fatih İnan | Web Geliştirme ve Teknoloji Yazıları",
  description: "Web geliştirme, programlama, teknoloji ve kişisel deneyimler hakkında yazılar. React, Next.js, JavaScript ve modern web teknolojileri.",
  keywords: "web geliştirme blog, programlama, React, Next.js, JavaScript, teknoloji yazıları, Fatih İnan blog",
  openGraph: {
    title: "Blog - Fatih İnan | Web Geliştirme ve Teknoloji Yazıları",
    description: "Web geliştirme, programlama ve teknoloji hakkında güncel yazılar",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Fatih İnan | Web Geliştirme ve Teknoloji Yazıları",
    description: "Web geliştirme, programlama ve teknoloji hakkında güncel yazılar",
  },
  alternates: {
    canonical: "https://fatihinan.com/blog",
  },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Fatih İnan Blog",
    "description": "Web geliştirme, programlama, teknoloji ve kişisel deneyimler hakkında yazılar",
    "url": "https://fatihinan.com/blog",
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
      "@id": "https://fatihinan.com/blog"
    }
  };

  return (
    <>
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Blog />
    </>
  );
}
