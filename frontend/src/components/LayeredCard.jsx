import React from 'react';
import { Card } from '@/components/ui/card';

const LayeredCard = ({children}) => {
  return (
    <div className="relative w-full max-w-md pt-1 pr-1">
      {/* Background Card */}
      <div 
        className="absolute top-3 left-3 w-full h-full rounded-3xl bg-primary"
      />
      {/* Main Card */}
      <Card className="relative w-full bg-white p-6 shadow-lg rounded-3xl border-black border-[3px]">
       {children}
      </Card>
    </div>
  );
};


export default LayeredCard;