import { authMiddleware } from "@clerk/nextjs";

// Use clerkMiddleware
export default authMiddleware({
  // Rutas públicas que no requieren autenticación
  publicRoutes: ["/", "/productos", "/acerca", "/privacidad", "/terminos"],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};