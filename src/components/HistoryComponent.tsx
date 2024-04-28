import { prisma } from '@/lib/db';
import { Clock, CopyCheck, Edit2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    take: limit,
    where: {
      userId,
    },
    orderBy: {
      timeStarted: 'desc',
    },
  });
  return (
    <div className="space-y-4">
      {games.map(game => {
        return (
          <>
            <div className="flex items-center w-full" key={game.id}>
              <div className="flex items-center w-full">
                {game.gameType === 'mcq' ? (
                  <CopyCheck className="mr-3" />
                ) : (
                  <Edit2 className="mr-3" />
                )}
                <div className="flex flex-1 flex-row w-full items-center ml-4 space-y-1">
                  <div className="flex flex-col w-full">
                    <p className="text-base font-medium leading-none underline mb-2">
                      {game.topic}
                    </p>
                    <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(game.timeEnded ?? 0).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {game.gameType === 'mcq'
                        ? 'Multiple Choice'
                        : 'Open-Ended'}
                    </p>
                  </div>
                  <div className="flex flex-row justify-end">
                    <Link href={`/statistics/${game.id}`} className="ml-auto">
                      <Button>Review</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
          </>
        );
      })}
    </div>
  );
};

export default HistoryComponent;
