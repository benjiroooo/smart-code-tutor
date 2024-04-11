import React from 'react';
import UserButton from './user-button';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16  px-4 mx-auto sm:px-6">
        LOGO
        {/* SearchBar goes here */}
        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;
