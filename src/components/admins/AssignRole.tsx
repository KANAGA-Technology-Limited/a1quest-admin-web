import { useEffect, useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { useFormik } from 'formik';
import { AdminType, RoleType } from '../../types/data';
import Dropdown from '../../common/Dropdown';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  data: AdminType | undefined;
  allRoles: RoleType[] | undefined;
}

function AssignRole({ closeModal, reload, open, data, allRoles }: Props) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<AdminType | null>(null); // Roles data isn't sent in get all admins so I had to fetch each admin's details

  const formik = useFormik({
    initialValues: {
      selectedRoles:
        (details?.populatedRoles &&
          details?.populatedRoles.length > 0 &&
          details.populatedRoles.map((item) => ({
            label: item.name,
            value: item._id,
          }))) ||
        [],
    },
    onSubmit: () => {
      submitValues();
    },

    enableReinitialize: true,
  });

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      try {
        const response = await appAxios.get('/admin-mgmt/' + data?._id);
        setDetails(response.data?.data);
      } catch (error) {
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };

    if (open && data) {
      getItem();
    }
  }, [open, data]);

  // Update formik role
  useEffect(() => {
    if (details && details.populatedRoles && details.populatedRoles.length > 0) {
      formik.setFieldValue(
        'selectedRoles',
        details.populatedRoles.map((item) => ({
          label: item.name,
          value: item._id,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  const submitValues = async () => {
    // if (!(formik.values.selectedRoles.length > 0)) {
    //   return sendFeedback('Please select at least one role', 'error');
    // }
    try {
      setLoading(true);
      const response = await appAxios.patch(`/roles/assign-to-admin`, {
        admin: data?._id,
        roles: formik.values.selectedRoles.map(
          (item: { value: string; label: string }) => item.value
        ),
      });
      closeModal();
      reload();
      formik.setFieldValue('selectedRoles', []);
      sendFeedback(response.data?.message, 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

  return (
    <CustomModal
      isOpen={open}
      onRequestClose={closeModal}
      title={`Assign Role to ${data?.firstName}`}
    >
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10'>
          <p className='text-sm mb-5 text-center'>
            Select the roles you want to assign below. Select more than one to assign
            multiple roles
          </p>
          {allRoles && allRoles.length > 0 ? (
            <Dropdown
              values={allRoles.map((role) => ({
                label: role.name,
                value: role._id,
              }))}
              name='selectedRoles'
              formik={formik}
              className='capitalize'
              placeholder='Select Role'
              isMulti
              value={formik.values.selectedRoles}
            />
          ) : (
            <p className='text-xs text-center text-gray-700'>No role found</p>
          )}
        </div>
        <div className='flex items-center w-full justify-around gap-4 px-5'>
          <Button type='submit' loading={loading} className='!w-full'>
            Assign
          </Button>
          <Button color='secondary' onClick={closeModal} className='!w-full'>
            Close
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default AssignRole;
