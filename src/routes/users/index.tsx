import Users from '../../pages/users';
import UserDetails from '../../pages/users/details';
import { PrivateRoute } from '../utils';

const usersRoutes = [
  {
    path: '/users',
    element: (
      <PrivateRoute>
        <Users />
      </PrivateRoute>
    ),
  },
  {
    path: '/users/:id',
    element: (
      <PrivateRoute>
        <UserDetails />
      </PrivateRoute>
    ),
  },
];

export default usersRoutes;
