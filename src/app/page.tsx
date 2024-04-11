'use client';

import { useChat } from 'ai/react';
import remarkGfm from 'remark-gfm';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowBigUp, ArrowUp, Loader2, Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  return (
    <div className="flex flex-col items-center p-2 bg-[#1a1a1a] min-h-screen min-w-screen">
      <div className="flex flex-col mb-20 w-full">
        {messages.map(m => (
          <div key={m.id} className="flex flex-row">
            {m.role === 'user' ? (
              <>
                {/* <div className="flex flex-row min-w-[50%]"> */}
                <div className="flex flex-row items-center gap-x-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>ME</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">Me:</p>
                </div>
                <div className="text-white rounded-lg prose dark:prose-invert mt-1.5 ml-2">
                  <Markdown remarkPlugins={[remarkGfm]}>{m.content}</Markdown>
                </div>
                {/* <Divider /> */}
                {/* </div> */}
              </>
            ) : (
              // <div className="flex flex-row">
              <>
                <div className="flex flex-row items-center gap-x-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>GM</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">Gemini:</p>
                </div>
                <div className=" rounded-lg prose dark:prose-invert mt-1.5 ml-2">
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code(props) {
                        const { node, className, children, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <SyntaxHighlighter
                            PreTag="div"
                            language={match[1]}
                            style={style}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...rest}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {m.content}
                  </Markdown>
                </div>
              </>
              // </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-row items-center justify-center w-full">
        <form onSubmit={handleSubmit} className="flex flex-row gap-x-2">
          <Input
            className="w-96"
            value={input}
            placeholder={isLoading ? 'Thinking...' : 'Say something...'}
            disabled={isLoading}
            onChange={handleInputChange}
          />
          <Button
            type="button"
            variant="ghost"
            // onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className='animate-spin' /> : <ArrowUp />}
          </Button>
        </form>
      </div>
    </div>
  );
}
