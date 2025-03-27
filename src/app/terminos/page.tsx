"use client";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Términos y Condiciones</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introducción</h2>
          <p className="mb-4">
            Bienvenido a la aplicación de recompensas de Nestlé. Al acceder y utilizar esta aplicación,
            usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo con estos
            términos y condiciones o cualquier parte de estos términos y condiciones, no debe utilizar
            esta aplicación.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Licencia de uso</h2>
          <p className="mb-4">
            Nestlé le otorga una licencia no exclusiva, no transferible y revocable para usar la
            aplicación de acuerdo con estos términos y condiciones.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Sistema de Monedas</h2>
          <p className="mb-4">
            Las monedas obtenidas a través de la aplicación:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>No tienen valor monetario real</li>
            <li>No son transferibles</li>
            <li>No pueden ser canjeadas por dinero en efectivo</li>
            <li>Solo pueden ser utilizadas para canjear productos dentro de la aplicación</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Uso Aceptable</h2>
          <p className="mb-4">
            Usted se compromete a no:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Usar la aplicación de manera fraudulenta</li>
            <li>Acceder sin autorización a nuestros sistemas</li>
            <li>Recolectar datos de manera automatizada</li>
            <li>Usar la aplicación de manera que cause daño a otros usuarios</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Privacidad</h2>
          <p className="mb-4">
            El uso de la aplicación está sujeto a nuestra política de privacidad, que forma parte
            de estos términos y condiciones. Nuestra política de privacidad establece cómo
            recopilamos y utilizamos su información personal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Limitación de Responsabilidad</h2>
          <p className="mb-4">
            Nestlé no será responsable de ningún daño indirecto, especial o consecuente que
            surja del uso o la imposibilidad de usar la aplicación.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Cambios en los Términos</h2>
          <p className="mb-4">
            Nestlé se reserva el derecho de modificar estos términos y condiciones en cualquier
            momento. Los cambios entrarán en vigor inmediatamente después de su publicación
            en la aplicación.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Ley Aplicable</h2>
          <p className="mb-4">
            Estos términos y condiciones se rigen por las leyes de Colombia y cualquier disputa
            será resuelta en los tribunales de Colombia.
          </p>
        </section>
      </div>
    </div>
  );
} 