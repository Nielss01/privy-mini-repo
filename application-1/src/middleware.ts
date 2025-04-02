import { NextRequest, NextResponse } from 'next/server'

// user to be authenticated, e.g. a login page
const PUBLIC_PAGES = ['/login', '/refresh']

export const config = {
  // Apply middleware to all paths except public pages
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
}

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl
  const cookieAuthToken = req.cookies.get('privy-token')
  const cookieSession = req.cookies.get('privy-session')
  console.log('cookieAuthToken', cookieAuthToken !== undefined)
  console.log('cookieSession', cookieSession !== undefined)

  // If the user is already authenticated and trying to access the login page,
  // redirect them to the home page
  if (cookieAuthToken && pathname === '/login') {
    return NextResponse.redirect(new URL('/org', req.url))
  }

  // Bypass middleware when `privy_oauth_code` is a query parameter, as
  // we are in the middle of an authentication flow
  if (searchParams.get('privy_oauth_code')) return NextResponse.next()
  if (PUBLIC_PAGES.includes(pathname)) return NextResponse.next()

  // If the user has `privy-token`, they are definitely authenticated
  const definitelyAuthenticated = Boolean(cookieAuthToken)
  // If user has `privy-session`, they also have `privy-refresh-token` and
  // may be authenticated once their session is refreshed in the client
  const maybeAuthenticated = Boolean(cookieSession)

  if (!definitelyAuthenticated) {
    if (maybeAuthenticated) {
      // If user is not definitely authenticated but maybe authenticated, redirect them to the `/refresh` page to trigger client-side refresh flow
      return NextResponse.redirect(new URL('/refresh', req.url))
    } else {
      // If user is not authenticated at all, redirect them to the `/login` page
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}
