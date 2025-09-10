import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Ana sayfa ziyaret edildiğinde
  if (request.nextUrl.pathname === '/') {
    // Browser dil tercihini kontrol et
    const acceptLanguage = request.headers.get('accept-language')
    const preferredLang = acceptLanguage?.includes('en') ? 'en' : 'tr'
    
    // Hemen redirect et
    return NextResponse.redirect(new URL(`/${preferredLang}`, request.url))
  }
  
  // Dil parametresi olmayan diğer yolları da kontrol et
  const pathname = request.nextUrl.pathname
  const segments = pathname.split('/').filter(Boolean)
  
  // Eğer ilk segment dil kodu değilse (tr, en), redirect et
  if (segments.length > 0 && !['tr', 'en'].includes(segments[0])) {
    const acceptLanguage = request.headers.get('accept-language')
    const preferredLang = acceptLanguage?.includes('en') ? 'en' : 'tr'
    
    return NextResponse.redirect(new URL(`/${preferredLang}${pathname}`, request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
