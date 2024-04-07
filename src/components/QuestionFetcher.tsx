// import { useFetcher } from 'next/navigation';

// // This is a server component or a client component using the App Router
// export default function QuestionForm() {
//   const fetcher = useFetcher();
//   const handleSubmit = async (question: string) => {
//     // Using `fetcher` to post to our internal API route
//     fetcher.submit({ question: question }, { action: '/api/queryGemini', method: 'post' });
//   };

//   return (
//     <div>
//       {/* Implement your form here */}
//       <button onClick={() => handleSubmit('Your question here')}>Ask</button>
//       {fetcher.data && <div>{fetcher.data.answer}</div>}
//     </div>
//   );
// }
