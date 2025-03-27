'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Permission, ROLE_PERMISSIONS, UserRole } from "@/types/user";

/**
 * Hook para manejar los permisos del usuario
 * @returns Objeto con funciones para verificar permisos y rol del usuario
 */
export function usePermissions() {
  const { user } = useUser();
  const [userRole, setUserRole] = useState<UserRole>(UserRole.USER);
  
  useEffect(() => {
    // Obtener el rol del usuario de los metadatos de Clerk
    const role = user?.publicMetadata?.role as UserRole;
    if (role && Object.values(UserRole).includes(role)) {
      setUserRole(role);
    }
  }, [user]);

  /**
   * Verifica si el usuario tiene un permiso específico
   * @param permission - Permiso a verificar
   * @returns true si el usuario tiene el permiso
   */
  const hasPermission = (permission: Permission): boolean => {
    return ROLE_PERMISSIONS[userRole].includes(permission);
  };

  return {
    hasPermission,
    userRole,
    isAdmin: userRole === UserRole.ADMIN,
    isUser: userRole === UserRole.USER
  };
} 