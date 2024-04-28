import { redirect } from 'next/navigation';
import { auth } from '../../../../auth';
import QuizCard from '@/components/quiz-card';
import HistoryCard from '@/components/HistoryCard';

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex flex-col justify-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-2 max-w-[75%]">
          Unleash your knowledge! Create custom quizzes on any topic imaginable.
          Test your friends, challenge yourself, or share your expertise with
          the world.
        </p>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <div className="flex flex-col w-full space-y-4">
          <QuizCard />
          <HistoryCard />
        </div>
      </div>
    </main>
  );
}
