import MainLayout from '@/components/layout/MainLayout';

const ScreeningPage = () => {
  const breadcrumbs = [
    {
      label: 'Dashboard',
      to: '/dashboard',
    },
    {
      label: 'Skrining',
    },
  ];
  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <h1>Screening Dashboard</h1>
    </MainLayout>
  );
};

export default ScreeningPage;
