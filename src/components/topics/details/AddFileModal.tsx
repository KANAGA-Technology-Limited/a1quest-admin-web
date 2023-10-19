import React, { useMemo, useRef, useState } from 'react';
import CustomModal from '../../../common/CustomModal/CustomModal';
import Button from '../../../common/Button';
import { appAxios } from '../../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { SingleTopicType } from '../../../types/data';
import Dropdown from '../../../common/Dropdown';
import { formatQuantity } from '../../../functions/stringManipulations';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
  data: SingleTopicType | undefined;
}

function AddFileModal({ closeModal, reload, open, data }: Props) {
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState<'document' | 'video' | 'audio'>('document');
  const avatarFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!file) {
      return sendFeedback('Please select a file', 'error');
    }
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append('topicResource', file);

      const response = await appAxios.post(
        `/topics/${data?._id}/upload-resources`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded * 100) / (progressEvent.total || 1);
            setProgress(progress);
          },
        }
      );
      closeModal();
      reload();
      setFile(undefined);
      sendFeedback(response.data?.message, 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const getAllowedFileType = useMemo(() => {
    let allowedType = '';
    switch (fileType) {
      case 'document':
        allowedType = '.pdf';
        break;
      case 'video':
        allowedType = '.mp4';
        break;
      case 'audio':
        allowedType = '.mp3';
        break;

      default:
        break;
    }
    return allowedType;
  }, [fileType]);

  return (
    <CustomModal
      isOpen={open}
      onRequestClose={closeModal}
      title='Upload File'
      shouldCloseOnOverlayClick={false}
    >
      <form onSubmit={uploadFile} className='w-full' spellCheck>
        <div className='w-full border-[0.6px] rounded-md border-[#DBDBDB] p-4 mt-7 mb-10'>
          <Dropdown
            values={
              ['document', 'video', 'audio']?.map((item) => ({
                label: item,
                value: item,
              })) || []
            }
            name='fileType'
            useFormik={false}
            showError={!fileType}
            onChange={(e) => {
              setFileType(e?.value);
            }}
            error='Required'
            className='capitalize mb-6'
            label='File Type'
            value={{
              label: fileType,
              value: fileType,
            }}
          />

          <button
            className='border border-dashed rounded-[4px] w-full h-[175px] flex items-center justify-center text-[#828282] border-[#828282] cursor-pointer mb-3'
            onClick={() => avatarFileRef.current?.click()}
            type='button'
          >
            {file ? (
              <div className='flex flex-col items-center gap-1'>
                <span className='text-sm font-semibold'>File Selected</span>
                <span className='text-sm'>{file.name}</span>
                <span className='text-xs'> {formatQuantity(file.size / 1000, 0)} kb</span>
              </div>
            ) : (
              'Click to select file'
            )}
          </button>
          <p className='flex items-center justify-between w-full mb-6'>
            <b>Supported Format:</b>
            <span>{getAllowedFileType}</span>
          </p>
          <input
            type='file'
            name='userAvatar'
            id='userAvatar'
            ref={avatarFileRef}
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
            accept={getAllowedFileType}
            hidden
          />
        </div>
        <Button
          type='submit'
          loading={loading}
          showProgress={progress > 0}
          progressTitle='Uploading'
          progressValue={progress}
          className={
            progress > 0 ? '!w-full mt-10 !pointer-events-none' : '!w-full mt-10'
          }
          disabled={!file}
        >
          Upload
        </Button>
      </form>
    </CustomModal>
  );
}

export default AddFileModal;
