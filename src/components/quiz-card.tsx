'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { quizCreationSchema } from '@/schemas/form/quiz';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, CopyCheck } from 'lucide-react';
import { Separator } from './ui/separator';
import QuizButton from './quiz-button';

export default function QuizCard() {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Me!</CardTitle>
          <CardDescription>Click here to create a quiz.</CardDescription>
        </CardHeader>
        <CardContent>
          <QuizButton />
        </CardContent>
      </Card>
    </div>
  );
}
