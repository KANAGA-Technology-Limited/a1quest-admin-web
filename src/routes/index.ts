import adminsRoutes from './admins';
import topicRoutes from './topics';
import authenticationRoutes from './authentication';
import dashboardRoutes from './dashboard';
import notificationsRoutes from './notifications';
import settingsRoutes from './settings';
import usersRoutes from './users';
import rolesRoutes from './roles';
import classesRoutes from './classes';
import achievementRoutes from './achievements';

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
];

export default routes;
