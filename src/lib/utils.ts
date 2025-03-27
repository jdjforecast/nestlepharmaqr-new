import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases de Tailwind de manera segura
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
