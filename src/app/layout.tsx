import type { Metadata } from "next";
import "@/app/css/globals.css";
import Providers from './providers'
import { Header } from "../../components/layout/header";
import { Footer } from "../../components/footer";



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
    <html lang="tr">
      <body>
        <Providers> 
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
            .font-serif { font-family: 'Playfair Display', serif; }
            body { font-family: 'Inter', sans-serif; }
            .bg-cream { background-color: #f5f5dc; }
            ::-webkit-scrollbar { width: 8px; }
            ::-webkit-scrollbar-track { background: #f1f1f1; }
            ::-webkit-scrollbar-thumb { background: #d2691e; border-radius: 4px; }
            ::-webkit-scrollbar-thumb:hover { background: #8b4513; }
            html { scroll-behavior: smooth; }
            
            /* Dark mode styles */
            .dark ::-webkit-scrollbar-track { background: #374151; }
            .dark ::-webkit-scrollbar-thumb { background: #f59e0b; }
            .dark ::-webkit-scrollbar-thumb:hover { background: #d97706; }
          `
        }} />
      </body>
    </html>
  );
}
