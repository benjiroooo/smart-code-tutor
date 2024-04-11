import Navbar from '@/components/navbar';
import { RightSidebar } from '@/components/right-sidebar';
import { Sidebar } from '@/components/sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col">
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <section className="flex w-[50%]">{children}</section>
        <RightSidebar />
      </div>
    </section>
  );
}
