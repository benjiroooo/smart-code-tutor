import React from 'react';
import UserButton from './user-button';
import { ThemeToggle } from './theme-toggle';

type Props = {};

const Navbar = async (props: Props) => {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16  px-4 mx-auto sm:px-6">
        LOGO
        {/* SearchBar goes here */}
        <div className='flex flex-row space-x-2'>
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
