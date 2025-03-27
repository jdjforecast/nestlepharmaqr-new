import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Rutas públicas que no requieren autenticación
  publicRoutes: ["/", "/api/webhooks(.*)"],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};