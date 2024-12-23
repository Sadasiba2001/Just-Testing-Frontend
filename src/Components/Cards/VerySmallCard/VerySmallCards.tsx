import React from 'react';

interface SmallCardProps {
  title: string; // Country name
  number: number; // Number of bookings
  icon: React.ReactNode; // Icon component to display on the right
  onClick?: () => void; // Optional click handler
}

const VerySmallCard: React.FC<SmallCardProps> = ({ title, number, icon, onClick }) => {
  return (
    <div
      className="flex w-full sm:w-[180px] h-[80px] rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
      style={{ backgroundColor: '#C8E4FF' }}
    >
      {/* Left Part for Title and Number */}
      <div className="flex flex-col justify-center p-4 w-2/3">
        <h1 className="text-sm text-black font-semibold">{title}</h1>
        <p className="text-xl text-black font-bold">{number}</p> 
      </div>

      {/* Right Part for Icon */}
      <div className="flex items-center justify-center w-1/3">
        {icon}
      </div>
    </div>
  );
};

export default VerySmallCard;
