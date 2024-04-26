'use server';

import { Button } from './ui/button';
import { GoHome, GoHomeFill } from 'react-icons/go';
import {
  IoBookOutline,
  IoBook,
  IoListCircle,
  IoListCircleOutline,
} from 'react-icons/io5';
import { redirect, usePathname } from 'next/navigation';

const data = [
  {
    name: 'Home',
    link: '/home',
    icon: <GoHome className="w-6 h-6 mr-4" />,
    active: <GoHomeFill className="w-6 h-6 mr-4" />,
  },
  {
    name: 'Courses',
    link: '/courses',
    icon: <IoBookOutline className="w-6 h-6 mr-4" />,
    active: <IoBook className="w-6 h-6 mr-4" />,
  },
  {
    name: 'Quiz',
    link: '/quiz',
    icon: <IoListCircleOutline className="w-6 h-6 mr-4" />,
    active: <IoListCircle className="w-6 h-6 mr-4" />,
  },
];

export default async function Sidebar() {
  return (
    <section className="flex flex-col items-center gap-2 h-newscreen w-[20%] border-r py-4 px-2">
      {data.map((data, index) => {
        return (
          <form
            key={index}
            action={() => {
              'use server';
              redirect(`${data.link}`);
            }}
            className="w-full"
          >
            <Button
              variant="outline"
              className="justify-start px-8 w-full h-14"
            >
              {data.icon} {data.name}
            </Button>
          </form>
        );
      })}
    </section>
  );
}
