import { clerkMiddleware } from "@clerk/nextjs/server";

// Use clerkMiddleware
export default clerkMiddleware();

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};