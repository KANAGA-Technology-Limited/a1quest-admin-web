import { PERMISSIONS } from '../hooks/data';
import {
  AchievementIcon,
  AdminsIcon,
  ClassIcon,
  HomeIcon,
  RoleIcon,
  SettingIcon,
  TopicIcon,
  UserIcon,
} from './navIcons';
import styles from './styles.module.css';

export interface navItemType {
  label: string;
  href: string;
  icon?: any;
  type?: 'link' | 'dropdown';
  dropdownLinks?: {
    label: string;
    href: string;
  }[];
  permission?: string;
}

export const mainLinks: navItemType[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <HomeIcon className={styles.navIcon} />,
  },

  {
    label: 'Topic',
    href: '/topics',
    icon: <TopicIcon className={styles.navIcon} />,
    permission: PERMISSIONS.view_topics,
  },
  {
    label: 'Class',
    href: '/classes',
    icon: <ClassIcon className={styles.navIcon} />,
    permission: PERMISSIONS.view_class,
  },
  {
    label: 'User',
    href: '/users',
    icon: <UserIcon className={styles.navIcon} />,
  },
  {
    label: 'Achievements',
    href: '/achievements',
    icon: <AchievementIcon className={styles.altNavIcon} />,
  },
];

export const preferencesLinks: navItemType[] = [
  {
    label: 'Admins',
    href: '/admins',
    icon: <AdminsIcon className={styles.navIcon} />,
    permission: PERMISSIONS.view_admins,
  },
  {
    label: 'Roles',
    href: '/roles',
    icon: <RoleIcon className={styles.navIcon} />,
    permission: PERMISSIONS.view_roles,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <SettingIcon className={styles.navIcon} />,
  },
];
