import { useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import * as yup from 'yup';
import { useFormik } from 'formik';
import LabelInput from '../../common/LabelInput/LabelInput';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { PermissionType } from '../../types/data';
import Checkbox from '../../common/Checkbox';

interface Props {
  closeModal: () => void;
  open: boolean;
  refetch: () => void;
  permissions: PermissionType[] | undefined;
}

function AddModal({ closeModal, refetch, open, permissions }: Props) {
  const [loading, setLoading] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<
    PermissionType[] | undefined
  >(undefined);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      name: yup.string().required('Required'),
    }),
  });

  const submitValues = async () => {
    if (!selectedPermissions || selectedPermissions.length <= 0) {
      return sendFeedback('Please select permissions for this role', 'error');
    }
    try {
      setLoading(true);
      const response = await appAxios.post('/roles', {
        name: formik.values.name,
        permissions: selectedPermissions.map((item) => item._id),
      });
      sendFeedback(response.data?.message, 'success');
      formik.resetForm();
      refetch();
      return closeModal();
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Add Role'>
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10'>
          <LabelInput
            formik={formik}
            name='name'
            label='Role Name'
            placeholder='Enter class name'
          />
          <p className='mt-8 mb-4 text-[#292929] font-medium'>Select Permissions</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {permissions?.map((permission) => {
              const checked = selectedPermissions?.some(
                (item) => item._id === permission._id
              );
              return (
                <Checkbox
                  checked={checked}
                  value={String(checked)}
                  id={permission._id}
                  label={permission.name}
                  className='capitalize'
                  onChange={() => {
                    // Check if permission exists
                    if (checked) {
                      setSelectedPermissions(
                        selectedPermissions?.filter((item) => item._id !== permission._id)
                      );
                    } else {
                      setSelectedPermissions((oldState) => [
                        ...(oldState ? oldState : []),
                        permission,
                      ]);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className='flex items-center w-full justify-around gap-4 px-5'>
          <Button type='submit' loading={loading} className='!w-full'>
            Add Role
          </Button>
          <Button color='secondary' onClick={closeModal} className='!w-full'>
            Close
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default AddModal;
