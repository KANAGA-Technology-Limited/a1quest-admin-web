import React from 'react';
import { SingleSubTopicType } from '../../../../types/data';
import DeleteMenu from './DeleteMenu';

const SubTopicVideos = ({
  data,
  refetch,
}: {
  data: SingleSubTopicType | undefined;
  refetch: () => void;
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-x-[13px] gap-y-[26px] w-full'>
      {data?.videos && data.videos.length > 0 ? (
        data.videos.map((item) => (
          <div key={item._id} className='relative'>
            <video
              width='100%'
              height='250px'
              controls
              className='!h-full !max-h-[250px] rounded-lg object-cover'
            >
              <source src={item.url} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
            <DeleteMenu
              subTopicId={data._id}
              resourceId={item._id}
              resourceType='videos'
              refetch={refetch}
            />
          </div>
        ))
      ) : (
        <p className='text-sm'>No videos found</p>
      )}
    </div>
  );
};

export default SubTopicVideos;
