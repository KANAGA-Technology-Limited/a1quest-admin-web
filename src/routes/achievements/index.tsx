import AchievementsPage from '../../pages/achievements';
import { PrivateRoute } from '../utils';

const achievementRoutes = [
  {
    path: '/achievements',
    element: (
      <PrivateRoute>
        <AchievementsPage />
      </PrivateRoute>
    ),
  },
];

export default achievementRoutes;
