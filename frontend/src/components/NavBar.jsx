"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const NavBar = () => {
  const [activeTab, setActiveTab] = useState('activities');

  const navItems = [
    { id: 'activities', label: 'Activities', iconBase: 'activities' },
    { id: 'goals', label: 'Goals', iconBase: 'goals' },
    { id: 'trainers', label: 'My Trainer', iconBase: 'personal_trainer_agent' },
    { id: 'communities', label: 'Communities', iconBase: 'communities' },
  ];

  const router = useRouter();

  const handleClickedTab = (id) => {
    setActiveTab(id);
    router.push(`/${id}`);
  }

  return (
    <nav className='border-t'>
      <div className="bg-accent rounded-full shadow-sm shadow-primary grid grid-cols-4 items-center border-2 border-black h-18 justify-between px-4 m-1">
        {navItems.map(({ id, label, iconBase }) => (
          <button
            key={id}
            onClick={() => handleClickedTab(id)}
            className={`flex flex-col items-center transition-colors duration-200 p-2 m-1 rounded-3xl
              ${activeTab === id ? 'bg-primary text-white' : 'text-black hover:bg-gray-200'}`}
          >
            <Image
              src={`/nav_bar_icons/${activeTab === id ? `${iconBase}_white` : `${iconBase}_black`}.png`}
              alt={label}
              width={12}
              height={12}
            />
            <span className="text-xs mt-2">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
