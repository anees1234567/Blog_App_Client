import { authCheck } from './app/lib/middleware/auth';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  return authCheck(req); 
 
}
 export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ],
};
