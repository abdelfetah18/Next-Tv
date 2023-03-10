// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import client from './database/connection';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let session = request.cookies.get("session");
  if(session){
    let sessions = await client.Auth(session.value);
    if(sessions.length == 0){
      const response = NextResponse.redirect(new URL('/user/sign_in', request.url));
      response.cookies.delete("session");
      return response;
    }
  }else{
    return NextResponse.redirect(new URL('/user/sign_in', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/movies/:path*','/series/:path*','/admin/:path*','/api/movies/:path*','/api/series/:path*','/api/watch_latest'],
}