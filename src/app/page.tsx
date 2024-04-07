'use client';

import { Input } from '@nextui-org/react';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          {m.role === 'user' ? 'Me: ' : 'Gemini: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <Input
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
