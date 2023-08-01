import { getSessionDetails } from '../../functions/userSession';
import ErrorPage from '../../pages/ErrorPage';
import Login from '../../pages/auth/Login';
import Dashboard from '../../pages/dashboard';
import { UserType } from '../../types/user';
import { PrivateRoute } from '../utils';

const currentUser: UserType | null = getSessionDetails();

const dashboardRoutes = [
  {
    path: '/',
    element: !currentUser ? <Login /> : <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
];

export default dashboardRoutes;
