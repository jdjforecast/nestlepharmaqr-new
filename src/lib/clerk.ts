/**
 * Configuración de Clerk para autenticación
 */

import { currentUser } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

/**
 * Obtener el usuario de Clerk con información completa
 */
export async function getClerkUser() {
  try {
    // Obtener el usuario actual desde Clerk
    const user = await currentUser();
    return user;
  } catch (error) {
    console.error("Error fetching Clerk user:", error);
    return null;
  }
}

/**
 * Obtener el ID del usuario autenticado
 */
export async function getUserId() {
  const { userId } = await auth();
  return userId;
}

/**
 * Función para verificar si un usuario está autenticado
 */
export async function isAuthenticated() {
  const { userId } = await auth();
  return !!userId;
}

/**
 * Crear o actualizar el usuario en Supabase después del registro en Clerk
 * Esta función se completará cuando tengamos la configuración de Supabase
 */
export async function syncUserToSupabase(userId: string) {
  const user = await getClerkUser();
  if (!user) return null;
  
  console.log("Sincronizando usuario a Supabase:", userId);
  
  // Aquí vendría la lógica para guardar en Supabase
  return user;
} 