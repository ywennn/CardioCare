import MainLayout from '@/components/layout/MainLayout';

const ScreeningHistoryPage = () => {
  const breadcrumbs = [
    {
      label: 'Dashboard',
      to: '/dashboard',
    },
    {
      label: 'Riwayat Skrining',
    },
  ];
  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <h1>RIwayat Skrining</h1>
    </MainLayout>
  );
};

export default ScreeningHistoryPage;
