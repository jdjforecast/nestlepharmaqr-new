import Link from "next/link";
import Image from "next/image";

/**
 * Página de inicio
 */
export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Bienvenido a Nestlé QR Experience
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Escanea, selecciona y adquiere productos Nestlé con nuestra plataforma QR.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/escaner"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Escanear QR
                </Link>
                <Link
                  href="/productos"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Ver productos
                </Link>
              </div>
            </div>
            <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
              <Image
                src="/next.svg" // Reemplazar con imagen de QR de Nestlé cuando esté disponible
                alt="QR Code"
                width={400}
                height={400}
                className="aspect-square rounded-lg object-cover object-center dark:invert"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                ¿Cómo funciona?
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Sigue estos simples pasos para disfrutar de la experiencia QR de Nestlé.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-bold">Regístrate</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Crea una cuenta con tu nombre y empresa para acceder a la plataforma.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-bold">Escanea</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Utiliza la cámara de tu dispositivo para escanear códigos QR de productos Nestlé.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold">Redime</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Usa tus monedas para redimir productos y recibirlos en tu ubicación.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 