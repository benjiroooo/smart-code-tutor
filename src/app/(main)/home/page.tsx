import { redirect } from 'next/navigation';
import { auth } from '../../../../auth';
import QuizCard from '@/components/quiz-card';
import HistoryCard from '@/components/HistoryCard';
import RecentActivityCard from '@/components/RecentActivityCard';
import DetailsDialog from '@/components/DetailsDialog';

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivityCard />
      </div>
    </main>
  );
}
