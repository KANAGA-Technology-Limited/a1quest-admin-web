import achievementRoutes from './achievements';
import adminsRoutes from './admins';
import authenticationRoutes from './authentication';
import broadcastRoutes from './broadcasts';
import classesRoutes from './classes';
import dashboardRoutes from './dashboard';
import { feedbackRoutes } from './feedback';
import notificationsRoutes from './notifications';
import rolesRoutes from './roles';
import settingsRoutes from './settings';
import topicRoutes from './topics';
import usersRoutes from './users';

const routes: any[] = [
  ...authenticationRoutes,
  ...dashboardRoutes,
  ...adminsRoutes,
  ...notificationsRoutes,
  ...settingsRoutes,
  ...topicRoutes,
  ...usersRoutes,
  ...rolesRoutes,
  ...classesRoutes,
  ...achievementRoutes,
  ...feedbackRoutes,
  ...broadcastRoutes,
];

export default routes;
