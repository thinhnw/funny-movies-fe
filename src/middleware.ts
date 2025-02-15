import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers'


export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard'];
  const publicRoutes = ['/login', '/signup'];

  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}