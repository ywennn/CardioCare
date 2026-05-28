import MainLayout from '@/components/layout/MainLayout';

export default function DashboardPage() {
  return (
    <MainLayout breadcrumbs={[{ label: 'Dashboard' }]}>
      <h1>Hello</h1>
    </MainLayout>
  );
}
