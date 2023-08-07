import Roles from '../../pages/roles';

import { PrivateRoute } from '../utils';

const rolesRoutes = [
  {
    path: '/roles',
    element: (
      <PrivateRoute>
        <Roles />
      </PrivateRoute>
    ),
  },
];

export default rolesRoutes;
