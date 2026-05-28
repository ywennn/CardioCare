import MainLayout from '@/components/layout/MainLayout';

const ProfilePage = () => {
  const breadcrumbs = [
    {
      label: 'Dashboard',
      to: '/dashboard',
    },
    {
      label: 'Profile',
    },
  ];
  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <h1>Profile Page</h1>
    </MainLayout>
  );
};

export default ProfilePage;
