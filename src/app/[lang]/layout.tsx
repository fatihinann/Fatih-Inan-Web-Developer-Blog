import type { Metadata } from "next";
import "./css/globals.css";
import Providers from '../providers'
import { Header } from "@/../components/ui/header";
import { Footer } from "@/../components/footer";

export const metadata: Metadata = {
  title: {
    default: "Fatih İnan | Web Geliştirici ve Teknoloji Tutkunu",
    template: "%s | Fatih İnan"
  },
  description: "Fatih İnan'ın kişisel web sitesi. Web geliştirme, programlama, teknoloji, kamp ve motosiklet tutkusu hakkında yazılar ve projeler.",
  keywords: "web geliştirici, frontend developer, React, Next.js, JavaScript, TypeScript, Fatih İnan, teknoloji blog, kamp, motosiklet",
  authors: [{ name: "Fatih İnan" }],
  creator: "Fatih İnan",
  publisher: "Fatih İnan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fatihinan.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://fatihinan.com',
    title: 'Fatih İnan | Web Geliştirici ve Teknoloji Tutkunu',
    description: 'Web geliştirme, programlama, teknoloji, kamp ve motosiklet tutkusu hakkında yazılar ve projeler.',
    siteName: 'Fatih İnan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
