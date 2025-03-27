import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

/**
 * Página de registro con Clerk
 */
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <div className="flex flex-col items-center">
        <Link href="/">
          <div className="mb-6 flex items-center gap-2">
            <Image 
              src="/next.svg" // Reemplazar con el logo de Nestlé cuando esté disponible
              alt="Nestlé Logo"
              width={100}
              height={40}
              priority
              className="dark:invert"
            />
          </div>
        </Link>
        <h1 className="text-xl font-semibold mb-1">Crear una cuenta</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Regístrate para acceder a la plataforma QR de Nestlé
        </p>
      </div>
      
      <div className="w-full max-w-md">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none w-full",
              formButtonPrimary: "bg-primary hover:bg-primary/90"
            }
          }}
          signInUrl="/signin"
          redirectUrl="/"
        />
      </div>
      
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link 
            href="/signin" 
            className="text-primary hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
} 