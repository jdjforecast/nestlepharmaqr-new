"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Acerca de la Aplicación</h1>
      
      <div className="prose max-w-none space-y-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
          <p className="mb-4">
            Buscamos mejorar la experiencia de nuestros consumidores a través de un
            innovador sistema de recompensas que premia su lealtad con productos
            Nestlé de alta calidad.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">¿Cómo Funciona?</h2>
          <p className="mb-4">
            Nuestra aplicación permite a los usuarios escanear códigos QR en productos
            Nestlé para acumular monedas que pueden ser canjeadas por productos
            exclusivos. Es una forma divertida y gratificante de disfrutar de
            nuestros productos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Beneficios</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Acumula monedas por cada compra</li>
            <li>Canjea tus monedas por productos exclusivos</li>
            <li>Accede a promociones especiales</li>
            <li>Recibe notificaciones sobre nuevos productos</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Créditos</h2>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-center">
              Una experiencia{" "}
              <Link 
                href="https://mipartner.com.co/" 
                target="_blank"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Mipartner
              </Link>
            </p>
            
            <div className="flex items-center space-x-2">
              <p>Developed by Jaime Forero C KOROVA MB</p>
              <Image
                src="/milk-bottle.svg"
                alt="Korova MB Logo"
                width={24}
                height={24}
                className="inline-block"
              />
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Enlaces Importantes</h2>
          <div className="space-y-2">
            <Link 
              href="/terminos" 
              className="block text-blue-600 hover:text-blue-800"
            >
              Términos y Condiciones
            </Link>
            <Link 
              href="/privacidad" 
              className="block text-blue-600 hover:text-blue-800"
            >
              Política de Privacidad
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
} 