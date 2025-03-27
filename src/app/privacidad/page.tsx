"use client";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Información que Recopilamos</h2>
          <p className="mb-4">
            Recopilamos la siguiente información cuando utiliza nuestra aplicación:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Información de registro (nombre, correo electrónico)</li>
            <li>Información de uso de la aplicación</li>
            <li>Historial de compras y canjes</li>
            <li>Información del dispositivo</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Uso de la Información</h2>
          <p className="mb-4">
            Utilizamos su información para:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Proporcionar y mejorar nuestros servicios</li>
            <li>Procesar sus transacciones</li>
            <li>Enviar notificaciones sobre su cuenta</li>
            <li>Prevenir actividades fraudulentas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Compartir Información</h2>
          <p className="mb-4">
            No vendemos ni compartimos su información personal con terceros, excepto:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Con su consentimiento</li>
            <li>Para cumplir con requisitos legales</li>
            <li>Para proteger nuestros derechos</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Seguridad</h2>
          <p className="mb-4">
            Implementamos medidas de seguridad técnicas y organizativas para proteger su
            información personal contra acceso no autorizado, pérdida o alteración.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Sus Derechos</h2>
          <p className="mb-4">
            Usted tiene derecho a:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Acceder a su información personal</li>
            <li>Corregir información inexacta</li>
            <li>Solicitar la eliminación de su información</li>
            <li>Oponerse al procesamiento de su información</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
          <p className="mb-4">
            Utilizamos cookies y tecnologías similares para mejorar su experiencia en la
            aplicación. Puede controlar el uso de cookies a través de la configuración de
            su navegador.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Cambios en la Política</h2>
          <p className="mb-4">
            Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos
            cualquier cambio material publicando la nueva política de privacidad y
            actualizando la fecha de &ldquo;última actualización&rdquo;.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contacto</h2>
          <p className="mb-4">
            Si tiene preguntas sobre esta política de privacidad, puede contactarnos a
            través de los canales oficiales de Nestlé Colombia.
          </p>
        </section>
      </div>
    </div>
  );
} 