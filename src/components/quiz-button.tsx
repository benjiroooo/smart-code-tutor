"use client"

import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { ListChecks, Settings2 } from "lucide-react";

export default function QuizButton() {
  return(
    <form
      action={ () => {
        redirect('/quiz')
      }}
      className="w-full"
    >
      <Button variant="default" className="w-full p-0">
        <ListChecks className='h-4 w-4 mr-2' /> Create Quiz
      </Button>
    </form>
  )
}