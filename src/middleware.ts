import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers'


export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const { pathname } = request.nextUrl;

  // const protectedRoutes = [ '/newsfeed' ];
  const publicRoutes = ['/login', '/signup', '/newsfeed'];

  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/newsfeed', request.url));
  }

  // if (!token && protectedRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}