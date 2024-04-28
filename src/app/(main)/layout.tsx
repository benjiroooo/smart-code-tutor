import Navbar from '@/components/navbar';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col">
      <Navbar />
      <div className="flex flex-row">
        <section className="flex w-full h-newscreen">{children}</section>
      </div>
    </section>
  );
}
