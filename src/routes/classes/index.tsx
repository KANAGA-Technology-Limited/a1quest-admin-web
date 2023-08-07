import Classes from '../../pages/classes';
import { PrivateRoute } from '../utils';

const classesRoutes = [
  {
    path: '/classes',
    element: (
      <PrivateRoute>
        <Classes />
      </PrivateRoute>
    ),
  },
];

export default classesRoutes;
