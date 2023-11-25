import Dashboard from '@/ui/dashboard/Dashboard';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <Dashboard>{children}</Dashboard>;
}
