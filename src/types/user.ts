export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface User {
  id: string;
  clerk_id: string;
  name: string;
  company: string;
  role: UserRole;
  coins: number;
  profile_image_url?: string;
  created_at: Date;
}

export type Permission =
  | 'view_products'
  | 'scan_qr'
  | 'manage_cart'
  | 'view_own_profile'
  | 'redeem_products'
  | 'view_reports'
  | 'manage_inventory'
  | 'manage_users'
  | 'manage_products'
  | 'generate_qr';

/**
 * Permisos por rol
 * Los usuarios tienen acceso básico a la aplicación
 * Los administradores tienen acceso completo al panel de administración
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.USER]: [
    'view_products',
    'scan_qr',
    'manage_cart',
    'view_own_profile',
    'redeem_products'
  ],
  [UserRole.ADMIN]: [
    'view_products',
    'scan_qr',
    'manage_cart',
    'view_own_profile',
    'redeem_products',
    'view_reports',
    'manage_inventory',
    'manage_users',
    'manage_products',
    'generate_qr'
  ]
}; 