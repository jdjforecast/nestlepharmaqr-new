import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Webhook para manejar eventos de Clerk (creación, actualización y eliminación de usuarios)
 */
export async function POST(req: Request) {
  // Obtener la firma del encabezado
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Si no hay firma, retornar error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: No svix headers", {
      status: 400,
    });
  }

  // Obtener el cuerpo de la solicitud
  const payload = await req.json();
  
  // En un entorno de producción, necesitamos validar la firma con el paquete svix
  // Para instalar: npm install svix
  // Esto se implementará cuando tengamos configuradas las variables de entorno

  // Manejar diferentes eventos de Clerk
  const event = payload as WebhookEvent;
  const eventType = event.type;

  // Manejar la creación de usuario
  if (eventType === "user.created") {
    const { id } = event.data;
    
    // Aquí añadiremos la sincronización con Supabase cuando esté configurado
    console.log("Usuario creado:", id);
    
    // Cuando tengamos Supabase configurado, usaremos esta lógica:
    // const userData = {
    //   clerk_id: id,
    //   email: event.data.email_addresses[0]?.email_address,
    //   name: `${event.data.first_name || ""} ${event.data.last_name || ""}`.trim(),
    //   coins: 150, // Cada usuario comienza con 150 monedas
    // };
    // await createUserInSupabase(userData);
  }

  // Manejar la actualización de usuario
  if (eventType === "user.updated") {
    const { id } = event.data;
    
    // Aquí añadiremos la actualización en Supabase cuando esté configurado
    console.log("Usuario actualizado:", id);
  }

  // Manejar la eliminación de usuario
  if (eventType === "user.deleted") {
    const { id } = event.data;
    
    // Aquí añadiremos la eliminación en Supabase cuando esté configurado
    console.log("Usuario eliminado:", id);
  }

  return NextResponse.json({ success: true });
} 