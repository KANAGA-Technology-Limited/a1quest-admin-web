import Topics from '../../pages/topics';
import { PrivateRoute } from '../utils';

const topicsRoutes = [
  {
    path: '/topics',
    element: (
      <PrivateRoute>
        <Topics />
      </PrivateRoute>
    ),
  },
];

export default topicsRoutes;
