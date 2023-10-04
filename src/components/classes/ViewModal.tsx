import CustomModal from '../../common/CustomModal/CustomModal';
import { ClassType } from '../../types/data';

interface Props {
  closeModal: () => void;
  open: boolean;
  data: ClassType | undefined;
}

function ViewModal({ closeModal, data, open }: Props) {
  if (!data) return null;
  return (
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Class Details'>
      {Object.keys(data).length ? (
        <>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Name:</b> {data.name}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Total Users:</b> {data.users}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Total Topics:</b> {data.topics}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Total Subtopics:</b> {data.subTopics}
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
