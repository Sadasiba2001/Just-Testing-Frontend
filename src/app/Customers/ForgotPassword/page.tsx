"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
}

const ForgotPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loader state
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Show loader
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORGOT_PASSWORD_API!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('Success:', data.message || 'Request successful.');
        setFormData({ name: '', email: '' });
        setIsLoading(false);
        // router.push('/Password'); // Navigate to /password
        router.push(`/Customers/Password?email=${encodeURIComponent(formData.email)}`);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error || 'Something went wrong.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Network Error:', error);
      setIsLoading(false);
    }
    finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-100">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-t-teal-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form
          className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-black">Forgot Password</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-black"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-black"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Next
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
