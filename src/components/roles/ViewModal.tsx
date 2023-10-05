import CustomModal from '../../common/CustomModal/CustomModal';
import { PermissionType, RoleType } from '../../types/data';

interface Props {
  closeModal: () => void;
  open: boolean;
  data: RoleType | undefined;
  permissions: PermissionType[] | undefined;
}

function ViewModal({ closeModal, data, open, permissions }: Props) {
  if (!data) return null;
  return (
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Role Details'>
      {Object.keys(data).length ? (
        <>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Name:</b> {data.name}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Total Admins:</b> {data.numOfAdmins}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Total Permissions:</b> {data.permissions.length}
          </p>

          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Permissions:</b>{' '}
            {data.permissions
              ?.map(
                (permission) => permissions?.find((item) => item._id === permission)?.name
              )
              ?.join(', ')}
          </p>

          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Created At:</b> {new Date(data.createdAt).toDateString()}
          </p>
        </>
      ) : (
        <>No detail found</>
      )}
    </CustomModal>
  );
}

export default ViewModal;
