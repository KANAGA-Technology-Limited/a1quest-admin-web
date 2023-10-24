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
      title='Test Details'
      width='1200px'
      shouldCloseOnOverlayClick={false}
    >
      {Object.keys(data).length ? (
        <>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Duration:</b> {data.duration} minutes
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Notice:</b> {data.notice}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Total Questions:</b> {data.questions.length}
          </p>

          <p className='capitalize mb-3 '>
            <b>Questions:</b>
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 w-full border-b-2 pb-2 mb-3'>
            {data.questions.map((question, index) => (
              <div
                className='p-3 rounded bg-slate-200 flex flex-col gap-2'
                key={question._id}
              >
                <p>
                  <b> {index + 1}</b>
                </p>
                <p>
                  <b>Question Title:</b> {question.title}
                </p>
                <p className='capitalize'>
                  <b>Question Type:</b> {question.question_type}
                </p>
                {question.question_type === 'input' && (
                  <p className='capitalize'>
                    <b>Question Option Type:</b> {question.question_input_type}
                  </p>
                )}
                <p>
                  <b>Total Options:</b> {question.options?.length}
                </p>
                <p>
                  <b>Options:</b>{' '}
                  {question.options
                    ?.map(
                      (item) =>
                        `${item.option_value}${item.isCorrectAnswer ? '(Correct)' : ''}`
                    )
                    ?.join(', ')}
                </p>
              </div>
            ))}
          </div>
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
