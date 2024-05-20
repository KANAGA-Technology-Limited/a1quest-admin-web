import { useEffect, useState } from 'react';
import { appAxios } from '../../api/axios';
import Pagination from '../../common/Pagination';
import { sendCatchFeedback } from '../../functions/feedback';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';

const FeedbackPage = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.get(`/admin-contact-us`);
      setAllData(response.data?.data);
      setTotalResults(response.data?.count);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const tableHeaders = ['fullName', 'email', 'message', 'creation_date'];
  return (
    <AppLayout>
      <PageLayout
        pageTitle='Feedback'
        description='View all user feedback sent on A1Quest'
        summaryText={
          (allData && allData.length > 0 && allData.length > 1
            ? `there are currently ${allData.length} messages`
            : `there is currently ${allData.length} message`) || ''
        }
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          bodyStyle: {
            textAlign: 'left',
          },
          headerStyle: {
            textAlign: 'left',
          },
        }}
      />
      <Pagination page={page} setPage={setPage} totalResults={totalResults} />
    </AppLayout>
  );
};

export default FeedbackPage;
