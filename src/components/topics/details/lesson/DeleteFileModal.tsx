import { FormEvent, useState } from 'react';
import { ResourceType } from '../../../../types/data';
import Button from '../../../../common/Button';
import { CrossIcon } from '../../../icons';
import CustomModal from '../../../../common/CustomModal/CustomModal';
import { sendCatchFeedback, sendFeedback } from '../../../../functions/feedback';
import { appAxios } from '../../../../api/axios';

interface Props {
  closeModal: () => void;
  open: boolean;
  refetch: () => void;
  lessonId: string;
  resourceId: string;
  resourceType: ResourceType;
}

const deleteEvents = ['Unlink this file from this lesson', 'Delete this file forever'];

const resourceTypes: ResourceType[] = ['audio', 'document', 'video'];

function DeleteFileModal({
  closeModal,
  refetch,
  open,
  resourceId,
  resourceType,
  lessonId,
}: Props) {
  const [loading, setLoading] = useState(false);
  console.log(resourceId, resourceType);
  const submitValues = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await appAxios.patch(`/lessons/${lessonId}/remove-resources`, {
        [resourceType]: resourceId,

        // Attach other resource types because the backend setup
        // was made to clear all resource types when desired
        ...resourceTypes
          .filter((item) => item !== resourceType)
          .reduce(
            (a, b) => ({
              ...a,
              [b]: '',
            }),
            {}
          ),
      });
      sendFeedback(response.data?.message, 'success');
      refetch();
      return closeModal();
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  if (!lessonId) return null;
  return (
    <CustomModal
      isOpen={open}
      onRequestClose={closeModal}
      title={`Delete ${resourceType} file`}
    >
      <form onSubmit={submitValues} className='w-full'>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10'>
          <h3 className='text-[#06102B] font-semibold text-lg mb-4 text-center'>
            Deleting this {resourceType} file would do the following:
          </h3>
          <ul className='flex flex-col gap-3'>
            {deleteEvents.map((item) => (
              <li className='flex items-center gap-[10px] text-[#4B5768]' key={item}>
                <CrossIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex items-center w-full justify-around gap-4 px-5'>
          <Button type='submit' loading={loading} className='!w-full !bg-error'>
            Delete
          </Button>
          <Button color='secondary' onClick={closeModal} className='!w-full'>
            Cancel
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default DeleteFileModal;
