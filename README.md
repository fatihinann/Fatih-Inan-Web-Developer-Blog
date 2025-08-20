# Fatih İnan - Web Developer Blog

## 📋 Proje Hakkında

Bu proje, Fatih İnan'ın kişisel web sitesi ve blog platformudur. Modern web teknolojileri kullanılarak geliştirilmiş, ölçeklenebilir ve performanslı bir full-stack web uygulamasıdır.

### 🎯 Özellikler

- 🌐 **Çok Dilli Destek**: Türkçe ve İngilizce içerik desteği
- 🌙 **Dark/Light Mode**: Kullanıcı tercihine göre tema değiştirme
- 📱 **Responsive Design**: Tüm cihazlarda mükemmel görünüm
- ⚡ **SEO Optimizasyonu**: Arama motorları için optimize edilmiş
- 🎨 **Modern UI/UX**: Tailwind CSS ile şık tasarım
- 📝 **Blog Sistemi**: Makale yazma ve yayınlama
- 🏠 **Kişisel Portfolyo**: Projeler ve yetenekler showcase
- 🎪 **Hobi Sayfası**: Kamp ve motosiklet tutkusu
- 📬 **İletişim Formu**: Ziyaretçilerle doğrudan iletişim

## 🚀 Teknolojiler

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework
- **[React 18](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Lucide React](https://lucide.dev/)** - Icons

### Backend & Database
- **Node.js** - Server runtime
- **Next.js API Routes** - Backend API

### Tools & Libraries
- **[React i18next](https://react.i18next.com/)** - Internationalization
- **[Google Fonts](https://fonts.google.com/)** - Typography (Inter, Playfair Display, JetBrains Mono)
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Kurulum

### Gereksinimler
- Node.js 18.0.0 veya üzeri
- pnpm (önerilen) veya npm/yarn

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/fatihinann/Fatih-Inan-Web-Developer-Blog.git
cd Fatih-Inan-Web-Developer-Blog
```

### 2. Bağımlılıkları Kurun
```bash
# pnpm ile (önerilen)
pnpm install

# veya npm ile
npm install

# veya yarn ile
yarn install
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
# pnpm ile
pnpm dev

# veya npm ile
npm run dev

# veya yarn ile
yarn dev
```

### 4. Tarayıcıda Açın
[http://localhost:3000](http://localhost:3000) adresini ziyaret edin.

## 🛠️ Kullanılabilir Scriptler

```bash
# Geliştirme sunucusunu başlat
pnpm dev

# Production build oluştur
pnpm build

# Production sunucusunu başlat
pnpm start

# Code linting
pnpm lint

# Tailwind CSS build
npx tailwindcss build
```

## 📁 Proje Yapısı

```
Fatih-Inan-Web-Developer-Blog/
├── app/                    # Next.js App Router
│   ├── components/         # Reusable components
│   ├── css/               # Global styles
│   ├── i18n/              # Internationalization
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Context providers
├── components/            # UI Components
│   ├── layout/           # Layout components
│   ├── ErrorBoundary.tsx # Error handling
│   └── footer.tsx        # Footer component
├── contexts/             # React contexts
│   └── ThemeContext.tsx  # Theme management
├── lib/                  # Utility libraries
│   └── i18n.ts          # i18n configuration
├── public/              # Static assets
│   ├── images/         # Image files
│   └── favicon.ico     # Site icon
├── styles/              # Additional styles
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: Amber (#f59e0b)
- **Dark Background**: Slate 900 (#0f172a)
- **Light Background**: White (#ffffff)
- **Text**: Gray scale

### Tipografi
- **Heading**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)
- **Code**: JetBrains Mono (Monospace)

## 🌐 Çoklu Dil Desteği

Proje Türkçe ve İngilizce dillerini destekler:

- **Türkçe (tr)**: Varsayılan dil
- **İngilizce (en)**: Alternatif dil

Dil dosyaları `lib/i18n.ts` içinde yapılandırılmıştır.

## 🔧 Konfigürasyon

### Tailwind CSS
Özel renkler ve animasyonlar `tailwind.config.js` dosyasında tanımlanmıştır.

## 📱 Sayfa Yapısı

- **Ana Sayfa** (`/`) - Kişisel tanıtım ve öne çıkan içerik
- **Hakkımda** (`/about`) - Kişisel ve profesyonel bilgiler
- **Blog** (`/blog`) - Teknik makaleler ve yazılar
- **Hobiler** (`/hobbies`) - Kamp ve motosiklet içerikleri
- **İletişim** (`/contact`) - İletişim formu ve bilgiler

## 🚀 Deployment

### Vercel (Önerilen)
```bash
# Vercel CLI ile deploy
npx vercel --prod
```

### Manuel Build
```bash
# Production build
pnpm build

# Static export (isteğe bağlı)
pnpm export
```

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje kişisel kullanım için geliştirilmiştir. Tüm hakları saklıdır.

## 👤 İletişim

**Fatih İnan**
- Website: [fatihinan.com](https://fatihinan.com)
- GitHub: [@fatihinann](https://github.com/fatihinann)
- Email: fatihinan3437@gmail.com

## 🙏 Teşekkürler

- [Next.js Team](https://nextjs.org/) - Amazing framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide](https://lucide.dev/) - Beautiful icons

---

⭐ Bu projeyi beğendiyseniz, star vermeyi unutmayın!
