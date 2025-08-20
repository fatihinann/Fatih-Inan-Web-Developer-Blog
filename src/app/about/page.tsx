import type { Metadata } from "next";
import { About } from "../../../components/about";

export const metadata: Metadata = {
  title: "Hakkımda - Fatih İnan | Web Geliştirici",
  description: "Fatih İnan'ın web geliştirme yolculuğu, deneyimleri ve uzmanlık alanları. Modern web teknolojileri, React, Next.js ve daha fazlası.",
  keywords: "web geliştirici, frontend developer, React, Next.js, JavaScript, TypeScript, Fatih İnan",
  openGraph: {
    title: "Hakkımda - Fatih İnan | Web Geliştirici",
    description: "Fatih İnan'ın web geliştirme yolculuğu ve uzmanlık alanları",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımda - Fatih İnan | Web Geliştirici",
    description: "Fatih İnan'ın web geliştirme yolculuğu ve uzmanlık alanları",
  },
  alternates: {
    canonical: "https://fatihinan.com/about",
  },
};

export default function AboutPage() {
  return <About />;
}
