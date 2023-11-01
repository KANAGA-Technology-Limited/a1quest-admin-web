import React from 'react';
import { SingleLessonType } from '../../../../types/data';
import usePermissions from '../../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../../hooks/data';
import DeleteFileMenu from './DeleteFileMenu';

const LessonAudio = ({
  data,
  refetch,
}: {
  data: SingleLessonType | undefined;
  refetch: () => void;
}) => {
  const { hasPermission } = usePermissions();

  return (
    <div className='w-full'>
      {data?.audio_url ? (
        <div className='relative w-full'>
          <audio controls className='w-full rounded-lg object-cover'>
            <source src={data?.audio_url} type='audio/mpeg' />
            Your browser does not support the audio tag.
          </audio>
          {hasPermission(PERMISSIONS.remove_subtopic_resources) && (
            <DeleteFileMenu
              lessonId={data._id}
              resourceId={data?.audio_identifier}
              resourceType='audio'
              refetch={refetch}
              className='!top-[10px] !right-[10px]'
            />
          )}
        </div>
      ) : (
        <p className='text-sm'>No audio found</p>
      )}
    </div>
  );
};

export default LessonAudio;
