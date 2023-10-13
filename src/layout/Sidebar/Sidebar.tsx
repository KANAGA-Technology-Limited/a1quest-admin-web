import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { signOut } from '../../store/slices/user';
import { mainLinks, navItemType, preferencesLinks } from '../navLinks';
import styles from '../styles.module.css';
import { LogoutIcon } from '../navIcons';
import Logo from '../../assets/brand/logo.svg';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import usePermissions from '../../hooks/usePermissions';
import SidebarLink from './SidebarLink';

function Sidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  const logoutUser = async () => {
    try {
      await appAxios.get('/admin/logout');
      sendFeedback('Logout successful', 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      dispatch(signOut());
      navigate('/auth/login');
    }
  };
  return (
    <nav className='w-[25vw] text-black pb-5 max-h-screen sticky top-0 bottom-0 hidden lg:block bg-white overflow-y-auto customized-scrollbar border-r border-r-[#F3F5F7]'>
      <div className='px-10 pt-[42px] pb-[58px]'>
        <Link to='/dashboard'>
          <img
            src={Logo}
            alt='A1Quest'
            className='cursor-pointer object-contain hidden md:block w-full h-auto'
          />
        </Link>
      </div>
      <ul className='flex flex-col px-4'>
        <p className='text-[#90A3BF] font-medium text-sm font-secondary mx-4 mb-[10px]'>
          Main Menu
        </p>
        <div className='flex flex-col gap-2 mb-[56px]'>
          {mainLinks.map((item: navItemType) => {
            if (item.permission) {
              return (
                hasPermission(item.permission) && (
                  <SidebarLink item={item} key={item.href} />
                )
              );
            } else {
              return <SidebarLink item={item} key={item.href} />;
            }
          })}
        </div>
        <p className='text-[#90A3BF] font-medium text-sm font-secondary mx-4 mb-[10px]'>
          Preferences
        </p>
        <div className='flex flex-col gap-2 mb-[56px]'>
          {preferencesLinks.map((item: navItemType) => {
            if (item.permission) {
              return (
                hasPermission(item.permission) && (
                  <SidebarLink item={item} key={item.href} />
                )
              );
            } else {
              return <SidebarLink item={item} key={item.href} />;
            }
          })}
        </div>
        <li className={styles.navLink} onClick={logoutUser}>
          <LogoutIcon />
          <span>Logout</span>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
