import adminsRoutes from './admins';
import topicRoutes from './topics';
import authenticationRoutes from './authentication';
import dashboardRoutes from './dashboard';
import notificationsRoutes from './notifications';
import settingsRoutes from './settings';
import usersRoutes from './users';
import rolesRoutes from './roles';
import classesRoutes from './classes';

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
];

export default routes;
