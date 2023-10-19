import Topics from '../../pages/topics';
import TopicDetails from '../../pages/topics/details';
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
  {
    path: '/topics/:id',
    element: (
      <PrivateRoute>
        <TopicDetails />
      </PrivateRoute>
    ),
  },
];

export default topicsRoutes;
