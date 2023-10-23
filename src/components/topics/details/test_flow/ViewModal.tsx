import CustomModal from '../../../../common/CustomModal/CustomModal';
import { TestType } from '../../../../types/data';

interface Props {
  closeModal: () => void;
  open: boolean;
  data: TestType | undefined;
}

function ViewModal({ closeModal, data, open }: Props) {
  if (!data) return null;
  return (
    <CustomModal isOpen={open} onRequestClose={closeModal} title='Role Details'>
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

          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Questions:</b>
          </p>
          <div className='flex flex-col gap-3 w-full'>
            {data.questions.map((question) => (
              <div className='pb-2 border-b-2' key={question._id}>
                <p>
                  <b>Question Title:</b> {question.title}
                </p>
                <p>
                  <b>Question Type:</b> {question.question_type}
                </p>
                {question.question_type === 'input' && (
                  <p>
                    <b>Question Option Type:</b> {question.question_input_type}
                  </p>
                )}
                <p>
                  <b>Total Options:</b> {question.options.length}
                </p>
                <p>
                  <b>Options:</b>{' '}
                  {question.options.map((item) => item.option_value).join(', ')}
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
