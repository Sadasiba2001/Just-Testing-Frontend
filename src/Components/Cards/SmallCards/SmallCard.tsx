import React from 'react';

interface SmallCardProps {
  title: string; // Title for the card
  icon: React.ReactNode; // Icon component to display
  number: number; // Number to display
  bgColor: string; // Background color prop
  onClick?: () => void; // Optional click handler
}

const SmallCard: React.FC<SmallCardProps> = ({ title, icon, number, bgColor, onClick }) => {
  return (
    <div
      className="flex w-full sm:w-[200px] h-[80px] rounded-md shadow-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
    >
      {/* Left Part for Text */}
      <div className="flex flex-col justify-center p-4 w-2/3">
        <h1 className="text-lg text-white font-semibold">{title}</h1>
        <p className="text-2xl text-white font-bold">{number}</p>
      </div>

      {/* Right Part for Icon */}
      <div className="flex items-center justify-center w-1/3">
        {icon} {/* Render the icon passed as a prop */}
      </div>
    </div>
  );
};

export default SmallCard;
