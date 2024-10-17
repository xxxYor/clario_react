import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (
    pathname.startsWith('/auth') 
    || pathname.startsWith('/_next') 
    || pathname.startsWith('/static')
    || /\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|otf|eot)$/.test(pathname)) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/auth', request.url))
}

export const config = {
  matcher: '/:path*',
}
