import CustomModal from '../../../../../common/CustomModal/CustomModal';
import { TestType } from '../../../../../types/data';

interface Props {
  closeModal: () => void;
  open: boolean;
  data: TestType | undefined;
}

function ViewModal({ closeModal, data, open }: Props) {
  if (!data) return null;
  return (
    <CustomModal
      isOpen={open}
      onRequestClose={closeModal}
      title='Question Details'
      width='600px'
      shouldCloseOnOverlayClick={false}
    >
      {Object.keys(data).length ? (
        <>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Title:</b> {data.title}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Question Type:</b> {data.question_type}
          </p>
          {data.question_type === 'input' && (
            <p className='capitalize mb-3 pb-2 border-b-2'>
              <b>Question Option Type:</b> {data.question_input_type}
            </p>
          )}
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Total Options:</b> {data.options.length}
          </p>

          <p className='capitalize mb-3 '>
            <b>Options:</b>
          </p>
          <ol className='flex flex-col gap-3 w-full border-b-2 pb-2 mb-3 list-inside list-lower-alpha px-3'>
            {data.options?.map((item) => (
              <li
                key={item._id}
                className={item.isCorrectAnswer ? "after:content-['_✓']" : ''}
                style={{
                  color: item.isCorrectAnswer ? 'var(--success)' : '#000',
                  fontWeight: item.isCorrectAnswer ? '600' : '300',
                }}
              >
                {item.option_value}
              </li>
            ))}
          </ol>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Created At:</b> {new Date(data.creation_date).toDateString()}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Updated At:</b> {new Date(data.last_update_date).toDateString()}
          </p>
        </>
      ) : (
        <>No detail found</>
      )}
    </CustomModal>
  );
}
export default ViewModal;
