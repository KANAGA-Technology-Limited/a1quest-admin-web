import BroadcastsPage from '../../pages/broadcasts';
import { PrivateRoute } from '../utils';

const broadcastRoutes = [
  {
    path: '/broadcasts',
    element: (
      <PrivateRoute>
        <BroadcastsPage />
      </PrivateRoute>
    ),
  },
];

export default broadcastRoutes;
