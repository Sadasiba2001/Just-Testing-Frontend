'use client';

import { useRouter } from 'next/navigation';
import React, { useState, FC } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from "next/image";
import Register from "../../../../public/LoginPic.jpg"

const Register1_Page: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_REGISTER_API;
      if (!apiUrl) {
        throw new Error('API URL is not defined in the .env file');
      }
      console.log('The registration data are: ', { name, email, password });

      const response = await axios.post(`${apiUrl}`, {
        name,
        email,
        password,
      });
      if (response.status === 200) {
        console.log("Registration successful");
      }
      console.log(response.data);
      router.push('/Auth/Login');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 relative">
      {/* Background Image */}
      <Image
        src={Register}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
      />
      <main className="flex-1 flex items-center justify-center w-full p-6 relative z-10">
        <form
          className="bg-white bg-opacity-50 p-8 rounded-lg shadow-2xl w-full max-w-md"  // Increased width to max-w-4xl
          onSubmit={handleRegister}
        >
          <h1 className="text-2xl font-semibold text-center mb-6 text-pink-700">Sign up to Account</h1>

          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
            <input
              id="name"
              type="text"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Confirm your password"
            />
          </div>
          <div className="text-center text-sm text-gray-600 mb-4">
            Already have an account?{' '}
            <Link href="/Auth/Login">
              <span className="text-blue-700 hover:underline cursor-pointer">Sign in</span>
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-700 text-white font-semibold rounded-md hover:bg-black focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register1_Page;
