import React, { useEffect, useRef, useState } from 'react';
import MoreIcon from '../../../../assets/icons/more.svg';
import autoAnimate from '@formkit/auto-animate';
import ClickAwayListener from 'react-click-away-listener';
import { DeleteIcon } from '../../../icons';
import DeleteFileModal from './DeleteFileModal';
import { ResourceType } from '../../../../types/data';

const DeleteFileMenu = ({
  resourceId,
  resourceType,
  lessonId,
  refetch,
  className = '',
  menuClassName = '',
}: {
  lessonId: string;
  resourceId: string;
  resourceType: ResourceType;
  refetch: () => void;
  className?: string;
  menuClassName?: string;
}) => {
  const parentRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);
  return (
    <>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div className={'absolute right-2 top-2 ' + className}>
          <button
            className=' p-2 px-3 bg-white rounded cursor-pointer duration-300 hover:bg-primary group !outline-none !border-none'
            onClick={() => setOpen(true)}
          >
            <img src={MoreIcon} alt='more' className='group-hover:invert' />
          </button>
          <div className='relative'>
            {open && (
              <nav
                className={
                  'rounded absolute right-0 top-2 bg-white w-24 shadow-md ' +
                  menuClassName
                }
              >
                <button
                  className='p-2 text-sm text-error cursor-pointer w-full flex items-center gap-2 !outline-none !border-none'
                  onClick={() => {
                    setDeleteModal(true);
                  }}
                >
                  <DeleteIcon />
                  <span>Delete</span>
                </button>
              </nav>
            )}
          </div>
        </div>
      </ClickAwayListener>
      <DeleteFileModal
        open={deleteModal}
        closeModal={() => setDeleteModal(false)}
        resourceId={resourceId}
        resourceType={resourceType}
        lessonId={lessonId}
        refetch={refetch}
      />
    </>
  );
};

export default DeleteFileMenu;
