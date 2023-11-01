import React from 'react';
import { SingleLessonType } from '../../../../types/data';
import usePermissions from '../../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../../hooks/data';
import DeleteFileMenu from './DeleteFileMenu';

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
          <iframe
            src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${data?.document_url}#toolbar=0&scrollbar=0`}
            width='100%'
            height={300}
            title='Document'
            className='rounded-lg'
          ></iframe>
          {hasPermission(PERMISSIONS.remove_subtopic_resources) && (
            <DeleteFileMenu
              lessonId={data._id}
              resourceId={data.document_identifier}
              resourceType='document'
              refetch={refetch}
              className='!left-2 !right-auto'
              menuClassName='!left-0 !right-auto'
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
