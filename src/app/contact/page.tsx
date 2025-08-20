import type { Metadata } from "next";
import { Contact } from "../../../components/contact";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "İletişim - Fatih İnan | Web Geliştirici",
  description: "Fatih İnan ile iletişime geçin. Web geliştirme projeleri, işbirliği ve sorularınız için bana ulaşın.",
  keywords: "iletişim, web geliştirici iletişim, Fatih İnan iletişim, proje teklifi, işbirliği",
  openGraph: {
    title: "İletişim - Fatih İnan | Web Geliştirici",
    description: "Web geliştirme projeleri ve işbirliği için iletişime geçin",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim - Fatih İnan | Web Geliştirici",
    description: "Web geliştirme projeleri ve işbirliği için iletişime geçin",
  },
  alternates: {
    canonical: "https://fatihinan.com/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "İletişim - Fatih İnan",
    "description": "Fatih İnan ile iletişime geçin. Web geliştirme projeleri ve işbirliği için.",
    "url": "https://fatihinan.com/contact",
    "mainEntity": {
      "@type": "Person",
      "name": "Fatih İnan",
      "jobTitle": "Web Geliştirici",
      "email": "fatih@fatihinan.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "İstanbul",
        "addressCountry": "TR"
      }
    }
  };

  return (
    <>
      <Script
        id="contact-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Contact />
    </>
  );
}
