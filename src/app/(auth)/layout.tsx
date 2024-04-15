export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-1 items-center justify-center">{children}</section>
  );
}
