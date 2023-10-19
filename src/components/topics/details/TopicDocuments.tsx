import React from 'react';
import { SingleTopicType } from '../../../types/data';
import DeleteMenu from './DeleteMenu';

const TopicDocuments = ({
  data,
  refetch,
}: {
  data: SingleTopicType | undefined;
  refetch: () => void;
}) => {
  console.log(data?.documents);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-x-[13px] gap-y-[26px] w-full'>
      {data?.documents && data.documents.length > 0 ? (
        data.documents.map((item) => (
          <div key={item._id} className='relative'>
            <iframe
              src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${item.url}#toolbar=0&scrollbar=0`}
              width='100%'
              height={500}
              title='Document'
              className='rounded-lg'
            ></iframe>
            <DeleteMenu
              topicId={data._id}
              resourceId={item._id}
              resourceType='documents'
              refetch={refetch}
            />
          </div>
        ))
      ) : (
        <p className='text-sm'>No documents found</p>
      )}
    </div>
  );
};

export default TopicDocuments;
