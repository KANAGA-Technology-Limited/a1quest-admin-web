import React from 'react';
import { SingleLessonType } from '../../../../types/data';
import usePermissions from '../../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../../hooks/data';
import DeleteFileMenu from './DeleteFileMenu';
import PDFViewer from '../../../../common/PDFViewer';

const LessonDocument = ({
  data,
  refetch,
}: {
  data: SingleLessonType | undefined;
  refetch: () => void;
}) => {
  const { hasPermission } = usePermissions();

  return (
    <div className='w-full'>
      {data?.document_url ? (
        <div className='relative w-full'>
          <PDFViewer file={data?.document_url} />
          {/* Alternative way to view PDFs with google */}
          {/* 
          <iframe
            src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${data?.document_url}#toolbar=0&scrollbar=0`}
            width='100%'
            height={300}
            title='Document'
            className='rounded-lg'
          ></iframe> */}
          {hasPermission(PERMISSIONS.remove_subtopic_resources) && (
            <DeleteFileMenu
              lessonId={data._id}
              resourceId={data.document_identifier}
              resourceType='document'
              refetch={refetch}
              className='!right-2 !left-auto z-10'
              menuClassName='!right-0 !left-auto z-10'
            />
          )}
        </div>
      ) : (
        <p className='text-sm'>No document found</p>
      )}
    </div>
  );
};

export default LessonDocument;
