import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import QuizCard from "@/components/quiz-card";

export default async function Home() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  return (
    <div>
      <QuizCard />
    </div>
  );
}
