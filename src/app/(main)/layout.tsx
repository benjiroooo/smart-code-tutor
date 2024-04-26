import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col">
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <section className="flex w-[75%] h-newscreen">{children}</section>
      </div>
    </section>
  );
}
