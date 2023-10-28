export const ALL_PERMISSIONS = [
  // user management
  "users:roles:write", // allow to add a role to a user
  "users:roles:delete", // allow to delete a role to a user
  // application permission
  "app:write",
  "app:read",
  "app:edit",
  "app:delete",
] as const;

export const PERMISSIONS = ALL_PERMISSIONS.reduce((acc, cur) => {
  acc[cur] = cur;
  return acc;
}, {} as Record<(typeof ALL_PERMISSIONS)[number], (typeof ALL_PERMISSIONS)[number]>);

export const APPLICATION_USER_PERMISSION = [
  PERMISSIONS["app:write"],
  PERMISSIONS["app:read"],
];

export const SYSTEM_ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  APPLICATION_USER: "APPLICATION_USER",
};
