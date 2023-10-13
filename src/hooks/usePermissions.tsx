import { useCallback } from 'react';
import { useAppSelector } from '../store/hooks';

const usePermissions = () => {
  const { user } = useAppSelector((state) => state.user);

  const hasPermission = useCallback(
    (permission: string) => {
      if (user) {
        const userPermissions = user.populatedRoles
          .map((role) => role.permissions.map((permission) => permission.name))
          .flat();

        const permissionFound =
          userPermissions.some((item) => item === permission) || user.role === 'super';
        return permissionFound;
      }
    },
    [user]
  );

  return {
    hasPermission,
  };
};

export default usePermissions;
