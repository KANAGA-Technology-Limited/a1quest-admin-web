import { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import { ClassType } from '../../types/data';
import Button from '../../common/Button';
import { AddIcon } from '../../components/icons';
// import ViewModal from '../../components/topics/ViewModal';

const Topics = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allClasses, setAllClasses] = useState<ClassType[] | undefined>(undefined);
  const [filter, setFilter] = useState('');
  // const [viewModal, setViewModal] = useState(false);
  // const [selected, setSelected] = useState('');

  const getClasses = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/classes`);
      setAllClasses(response.data?.data);
      setFilter(response.data.data[0]._id);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getClasses();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.post(`/topics/view-topics`, {
        ...(filter &&
          filter !== '' && {
            class_id: filter,
          }),
      });
      setAllData(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (filter) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const tableHeaders = ['title', 'description', 'tableAction'];

  return (
    <AppLayout>
      <PageLayout
        pageTitle='Topics'
        description='Keep track of of the subject on A1Quest'
        summaryText={
          (allData &&
            allData.length > 0 &&
            `you currently have a total number of ${allData.length} ${
              allData.length > 1 ? 'subjects' : 'subject'
            }`) ||
          ''
        }
        pageActions={
          <Button
          //  onClick={() => setAddModal(true)}
          >
            <AddIcon />
            Add Topic
          </Button>
        }
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          // menuItems: [
          //   {
          //     label: 'View Appointment',
          //     onClick: (id) => {
          //       setSelected(id);
          //       setViewModal(true);
          //     },
          //   },
          // ],
        }}
        pageFilters={
          allClasses
            ? {
                filters: allClasses.map((item) => ({
                  label: item.name,
                  value: item._id,
                })),
                onChange: (value) => setFilter(value),
                activeFilter: filter,
              }
            : undefined
        }
      />

      {/* <ViewModal open={viewModal} closeModal={() => setViewModal(false)} id={selected} /> */}
    </AppLayout>
  );
};

export default Topics;
