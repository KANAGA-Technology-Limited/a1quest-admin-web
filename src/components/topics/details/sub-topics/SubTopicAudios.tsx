import React from 'react';
import { SingleSubTopicType } from '../../../../types/data';
import DeleteMenu from './DeleteMenu';
import usePermissions from '../../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../../hooks/data';

const SubTopicAudios = ({
  data,
  refetch,
}: {
  data: SingleSubTopicType | undefined;
  refetch: () => void;
}) => {
  const { hasPermission } = usePermissions();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-x-[13px] gap-y-[26px] w-full'>
      {data?.audios && data.audios.length > 0 ? (
        data.audios.map((item) => (
          <div key={item._id} className='relative'>
            <audio
              // width='100%'
              // height='250px'
              controls
              className='w-full rounded-lg object-cover'
            >
              <source src={item.url} type='audio/mpeg' />
              Your browser does not support the audio tag.
            </audio>
            {hasPermission(PERMISSIONS.remove_subtopic_resources) && (
              <DeleteMenu
                subTopicId={data._id}
                resourceId={item._id}
                resourceType='audios'
                refetch={refetch}
                className='!top-[10px] !right-[10px]'
              />
            )}
          </div>
        ))
      ) : (
        <p className='text-sm'>No audios found</p>
      )}
    </div>
  );
};

export default SubTopicAudios;
