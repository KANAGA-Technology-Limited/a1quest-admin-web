import React, { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageHeader from '../../layout/PageLayout/PageHeader';
import { StudentType } from '../../types/data';
import usePermissions from '../../hooks/usePermissions';
import { useParams } from 'react-router-dom';
import { sendCatchFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import { PERMISSIONS } from '../../hooks/data';
import Button from '../../common/Button';
import UnfreezeModal from '../../components/users/UnfreezeModal';
import UserAvatar from '../../components/users/UserAvatar';
import LoadingIndicator from '../../common/LoadingIndicator';
import PersonalInfo from '../../components/users/PersonalInfo';
import SchoolInfo from '../../components/users/SchoolInfo';
import AccountInfo from '../../components/users/AccountInfo';
import GuardianDetails from '../../components/users/GuardianDetails';
import ReferralInfo from '../../components/users/ReferralInfo';
import SubscriptionInfo from '../../components/users/SubscriptionInfo';
import StyledTabs from '../../common/StyledTabs';
import UserPerformance from '../../components/users/tabs/performance/UserPerformance';
import UserReport from '../../components/users/tabs/report/UserReport';
import UserTestLog from '../../components/users/tabs/test-log/UserTestLog';
import UserAchievement from '../../components/users/tabs/achievement/UserAchievement';

const tabs = ['Performance', 'Report', 'Test Log', 'Achievements'];

const UserDetails = () => {
  const [data, setData] = useState<StudentType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { hasPermission } = usePermissions();
  const [unfreezeModal, setUnfreezeModal] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);

      const response = await appAxios.get(`/users/${id}`);
      setData(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    hasPermission(PERMISSIONS.view_user) && getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

  const panels = [
    <UserPerformance key='Performance' userId={data?._id || ''} />,
    <UserReport key='Report' userId={data?._id || ''} />,
    <UserTestLog key='Test Log' userId={data?._id || ''} />,
    <UserAchievement key='Achievements' userId={data?._id || ''} />,
  ];

  return (
    <AppLayout>
      <PageHeader
        showBack
        pageTitle='User Details'
        description='View and manage user account details'
        loading={loading}
        pageActions={
          data &&
          !data.isNotFreezed &&
          hasPermission(PERMISSIONS.unfreeze_user) && (
            <Button onClick={() => setUnfreezeModal(true)}>Unfreeze Account</Button>
          )
        }
      />

      {loading ? (
        <LoadingIndicator />
      ) : data ? (
        <>
          <div className='bg-white p-6 flex flex-col gap-4'>
            <UserAvatar avatar={data.profilePicture} />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
              <AccountInfo user={data} />
              <PersonalInfo user={data} />
              <SchoolInfo user={data} />
              <GuardianDetails user={data} />
              <ReferralInfo user={data} />
              <SubscriptionInfo user={data} />
            </div>
            <StyledTabs tabs={tabs} panels={panels} panelClassName='px-5' />
          </div>

          <UnfreezeModal
            open={unfreezeModal}
            closeModal={() => setUnfreezeModal(false)}
            data={data}
            refetch={getData}
          />
        </>
      ) : (
        <p>User not found</p>
      )}
    </AppLayout>
  );
};

export default UserDetails;
