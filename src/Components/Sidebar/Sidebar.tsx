"use client";

import React, { useEffect, useState } from 'react';
import { Home, Ticket, Settings, Phone, Star, BarChart, LogOut } from 'lucide-react';
import Image from 'next/image';
import Logo from "../../../public/icons/cvaat_logo_final-01.png";
import Link from 'next/link';

const SidebarComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // State for selected item

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className={`flex ${isOpen ? 'w-60' : 'w-16'} h-full bg-white transition-width duration-300 border rounded shadow-md shadow-gray-400`}>
      <div className="flex flex-col justify-between h-full">
        <div>
          {/* Logo section */}
          <div className="flex items-center justify-center h-24 px-4">
            <Image
              src={Logo}
              alt='Company logo'
              width={isOpen ? 180 : 40}
              height={isOpen ? 70 : 40}
              className={`transition-all block sm:w-40 sm:h-16 md:w-48 md:h-20`}
            />
          </div>
          {/* Navigation */}
          <nav className="mt-6 flex-1">
            <ul>
              <li
                className={`flex items-center p-5 text-black w-full cursor-pointer ${selectedItem === 'dashboard' ? 'bg-gray-200 rounded' : ''}`}
                onClick={() => handleItemClick('dashboard')}
              >
                <Link href="/Customers/Dashboard" className="flex items-center w-full">
                  <Home className="w-6 h-6" />
                  <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>Dashboard</span>
                </Link>
              </li>
              <li
                className={`flex items-center p-5 text-black cursor-pointer ${selectedItem === 'properties' ? 'bg-gray-200 rounded' : ''}`}
                onClick={() => handleItemClick('Ticket')}
              >
                <Link href="/Customers/Ticket" className="flex items-center w-full">
                  <Ticket className="w-6 h-6" />
                  <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>Ticket</span>
                </Link>
              </li>
              <li
                className={`flex items-center p-5 text-black cursor-pointer ${selectedItem === 'revenue' ? 'bg-gray-200 rounded' : ''}`}
                onClick={() => handleItemClick('revenue')}
              >
                <Link href="/" className="flex items-center w-full">
                  <LogOut className="w-6 h-6" />
                  <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>Log Out</span>
                </Link>
              </li>
              <li
                className={`flex items-center p-5 text-black cursor-pointer ${selectedItem === 'messages' ? 'bg-gray-200 rounded' : ''}`}
                onClick={() => handleItemClick('messages')}
              >
                <Phone className="w-6 h-6" />
                <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>Contact</span>
              </li>
              <li
                className={`flex items-center p-5 text-black cursor-pointer ${selectedItem === 'users' ? 'bg-gray-200 rounded' : ''}`}
                onClick={() => handleItemClick('users')}
              >
                <Link href="/Customers/Review" className="flex items-center w-full">
                  <Star className="w-6 h-6" />
                  <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>Review</span>
                </Link>
              </li>
              <li
                className={`flex items center p-5 text-black cursor-pointer  ${selectedItem === 'analytics' ? 'bg-gray-200 rounded' : ''}`}
                onClick={() => handleItemClick('analytics')}
              >
                <Link href="/Customers/Analytics" className="flex items-center w-full ">
                  <BarChart className="w-6 h-6" />
                  <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>Analytics</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
