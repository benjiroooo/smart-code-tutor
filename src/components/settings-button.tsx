"use client"

import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { Settings2 } from "lucide-react";

export default function SettingsButton() {
  return(
    <form
      action={ () => {
        redirect('/settings')
      }}
      className="w-full"
    >
      <Button variant="ghost" className="justify-start h-8 w-full p-0">
        <Settings2 className='h-4 w-4 mr-2' /> Settings
      </Button>
    </form>
  )
}