import type { UserPermission, UserRole } from "@/features/auth/types/auth.types";

export const permissionsByRole: Record<UserRole, UserPermission[]> = {
  admin: [
    "manage_students",
    "manage_teachers",
    "view_dashboard",
    "manage_attendance",
    "manage_courses",
    "manage_notifications",
  ],
  teacher: ["view_dashboard", "manage_attendance", "manage_courses"],
  student: ["view_dashboard"],
  parent: ["view_dashboard"],
};

export const hasPermission = (
  role: UserRole | undefined,
  permission: UserPermission,
  explicitPermissions?: UserPermission[]
) => {
  if (explicitPermissions?.includes(permission)) {
    return true;
  }

  if (!role) {
    return false;
  }

  return permissionsByRole[role].includes(permission);
};
