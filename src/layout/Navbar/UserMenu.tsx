import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { Link, useNavigate } from 'react-router-dom';
import { appAxios } from '../../api/axios';
import ArrowDownIcon from '../../assets/icons/chevron-down.svg';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { getNameInitials } from '../../functions/stringManipulations';
import usePermissions from '../../hooks/usePermissions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signOut } from '../../store/slices/user';
import { mainLinks, navItemType, preferencesLinks } from '../navLinks';

function UserMenu() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const parentRef = useRef(null);
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

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  if (!user) return null;

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className='flex items-center' ref={parentRef}>
        {/* <Notification /> */}
        <div className='relative'>
          <button onClick={() => setOpen(true)} className='flex items-center relative'>
            <div className='w-[39px] h-[39px] bg-[#00FFFF] flex items-center justify-center rounded-full mr-[5px]'>
              <span className='font-semibold text-sm text-black uppercase'>
                {getNameInitials(user?.firstName + ' ' + user?.lastName || '')}
              </span>
            </div>
            <div className='md:flex flex-col items-start mr-4 hidden'>
              <span className='capitalize font-bold text-lg'>
                {user?.firstName + ' ' + user?.lastName}
              </span>
              <span className='capitalize font-normal text-sm text-[#5A5A5A]'>
                {user?.role}
              </span>
            </div>
            <img src={ArrowDownIcon} alt='Menu' />
          </button>
          {open && (
            <nav
              className='rounded absolute right-0 top-14 bg-white w-40'
              style={{ boxShadow: '12px 12px 24px rgba(0, 0, 0, 0.1)' }}
            >
              <ul className='flex flex-col'>
                {[...mainLinks, ...preferencesLinks].map((item: navItemType) => {
                  if (item.permission) {
                    return (
                      hasPermission(item.permission) && (
                        <Link to={item.href} key={item.href}>
                          <li className='p-2 hover:bg-primary hover:text-white text-sm'>
                            {item.label}
                          </li>
                        </Link>
                      )
                    );
                  } else {
                    return (
                      <Link to={item.href} key={item.href}>
                        <li className='p-2 hover:bg-primary hover:text-white text-sm'>
                          {item.label}
                        </li>
                      </Link>
                    );
                  }
                })}

                <li
                  className='p-2 text-sm hover:bg-primary text-error hover:text-white cursor-pointer'
                  onClick={logoutUser}
                >
                  Logout
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default UserMenu;
