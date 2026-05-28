import MainLayout from '@/components/layout/MainLayout';

const ScreeningResultPage = () => {
  const breadcrumbs = [
    {
      label: 'Dashboard',
      to: '/dashboard',
    },
    {
      label: 'Riwayat Skrining',
      to: '/history',
    },
    {
      label: 'Detail Skrining',
    },
  ];
  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <h1>Detail Skrining</h1>
    </MainLayout>
  );
};

export default ScreeningResultPage;
