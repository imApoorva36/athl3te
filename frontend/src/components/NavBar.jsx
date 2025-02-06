"use-client"

import React, { useState } from 'react';

const NavBar = () => {
  const [activeTab, setActiveTab] = useState('activities');

  const navItems = [
    { id: 'activities', label: 'Activities', iconBase: 'activities' },
    { id: 'goals', label: 'Your Goals', iconBase: 'goals' },
    { id: 'personal_trainer', label: 'Personal Trainer', iconBase: 'personal_trainer_agent' },
    { id: 'communities', label: 'Communities', iconBase: 'communities' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
      <div className="bg-white rounded-full shadow-lg px-1 py-1 flex items-center gap-8 border-2 border-black">
        {navItems.map(({ id, label, iconBase }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center transition-colors duration-200 px-6 py-2 rounded-full
              ${activeTab === id ? 'bg-primary text-white' : 'text-black hover:bg-gray-200'}`}
          >
            <img
              src={`/nav_bar_icons/${activeTab === id ? `${iconBase}_white` : `${iconBase}_black`}.png`} // Dynamically set image source
              alt={label}
              width={24}
              height={24}
            />
            <span className="text-sm mt-2 font-bold">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
