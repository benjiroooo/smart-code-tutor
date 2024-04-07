// Assuming this is part of your TutorInterface component or similar
'use client';
import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';

const TutorInterface = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleQuestionSubmit = async () => {
    try {
      const response = await fetch('/api/queryGemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAnswer(data.answer); // Assuming the API returns an object with an 'answer' property
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  return (
    <div className='flex flex-col h-screen items-center justify-center p-4 space-y-2'>
      <Input
        type="text"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ask a programming question"
      />
      <Button onClick={handleQuestionSubmit}>Ask</Button>
      {answer && <div>{answer}</div>}
    </div>
  );
};

export default TutorInterface;
