import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    const path = request.nextUrl.pathname

    const isAuthPage = path === '/login' || path === '/register'
    const isProtectedPage = path.startsWith('/profile') || path.startsWith('/admin')

    if (isProtectedPage && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/profile/:path*', '/admin/:path*', '/login', '/register']
}