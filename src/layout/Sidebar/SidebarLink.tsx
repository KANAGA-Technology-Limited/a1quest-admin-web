import React from 'react';
import { navItemType } from '../navLinks';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles.module.css';

const SidebarLink = ({ item }: { item: navItemType }) => {
  const location = useLocation();

  const checkRouteMatch = (route: string) => {
    const path = location.pathname;
    return path.includes(route);
  };
  return (
    <Link to={item.href}>
      <li className={checkRouteMatch(item.href) ? styles.activeNavLink : styles.navLink}>
        {item.icon}
        <span>{item.label}</span>
      </li>
    </Link>
  );
};

export default SidebarLink;
