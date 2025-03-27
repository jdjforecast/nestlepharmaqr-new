import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

/**
 * Cliente de Supabase tipado
 * Usar este cliente para todas las operaciones con la base de datos
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

/**
 * Bucket para almacenar imágenes y códigos QR
 */
export const STORAGE_BUCKETS = {
  PRODUCTS: 'products',
  QR_CODES: 'qr-codes',
  PROFILES: 'profiles'
} as const;

/**
 * Funciones helpers para operaciones comunes
 */

/**
 * Obtiene la URL pública de un archivo en un bucket
 */
export async function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Sube un archivo a un bucket
 * @returns URL pública del archivo
 */
export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<string> {
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file);

  if (uploadError) {
    throw uploadError;
  }

  return getPublicUrl(bucket, path);
}

/**
 * Elimina un archivo de un bucket
 */
export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) {
    throw error;
  }
}

// Helper functions for file uploads
export async function uploadProductImage(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from('products')
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function uploadQRCode(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from('qr-codes')
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('qr-codes')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function uploadProfileImage(file: File, userId: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}.${fileExt}`;

  const { error } = await supabase.storage
    .from('profiles')
    .upload(fileName, file, {
      upsert: true // Sobrescribir si existe
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('profiles')
    .getPublicUrl(fileName);

  return publicUrl;
} 