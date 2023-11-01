import React from 'react';
import { SingleLessonType } from '../../../../types/data';
import usePermissions from '../../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../../hooks/data';
import DeleteFileMenu from './DeleteFileMenu';

const LessonVideo = ({
  data,
  refetch,
}: {
  data: SingleLessonType | undefined;
  refetch: () => void;
}) => {
  const { hasPermission } = usePermissions();

  return (
    <div className='w-full'>
      {data?.video_url ? (
        <div className='relative w-full'>
          <video
            width='100%'
            height='300px'
            controls
            className='!h-full !max-h-[300px] rounded-lg object-cover'
          >
            <source src={data?.video_url} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
          {hasPermission(PERMISSIONS.remove_subtopic_resources) && (
            <DeleteFileMenu
              lessonId={data._id}
              resourceId={data?.video_identifier}
              resourceType='video'
              refetch={refetch}
            />
          )}
        </div>
      ) : (
        <p className='text-sm'>No video found</p>
      )}
    </div>
  );
};

export default LessonVideo;
