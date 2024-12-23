'use client';

import Link from 'next/link';
import Image from 'next/image';
import Landing from '../../public/Landingpage.jpg';


const HeroSection: React.FC = () => {
  return (
    <section
    className="h-screen w-screen flex items-center justify-center relative overflow-hidden"
    style={{
      backgroundImage: `url(${Landing.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
      {/* Animated Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-gradient-to-r animate-gradient-x from-cyan-400 via-teal-500 to-blue-700"></div>

      {/* Centered Content */}
      <div className="text-center max-w-xl space-y-6 bg-gray-900 bg-opacity-70 p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
          Welcome to <br />
          <span className="text-pink-700">CVAATS Solutions</span>
        </h1>
        <p className="text-gray-200 text-base sm:text-lg font-light max-w-md mx-auto">
          Empowering your business with innovative solutions and expert guidance. Join us to transform your vision into reality.
        </p>
        <Link href="/Auth/Login">
          <button className="bg-pink-700 text-gray-900 px-6 py-3 text-lg font-medium rounded-lg shadow-lg hover:bg-blue-400 hover:text-white transition ease-in-out duration-200">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
