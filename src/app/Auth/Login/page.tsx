"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaFacebook, FaLinkedin, FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import LoginPic from "../../../../public/LoginPic.jpg";
import Register from "../Register/page"; // Make sure to import the Register component
// import ForgotPassword from "../ForgotPassword/page";
import Dashboard from "../../Customers/Dashboard/page"

const Login1: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("");
  const [isRegisterForm, setIsRegisterForm] = useState(false); // State to toggle forms
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_LOGIN_API;
      if (!apiUrl) {
        throw new Error("API URL is not defined in the .env file");
      }

      const response = await axios.post(`${apiUrl}`, { email, password });

      if (response.status === 200) {
        const { access_token, refresh_token } = response.data || {};
        if (access_token && refresh_token) {
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          setEmail("");
          setPassword("");
          router.push("/Customers/Dashboard");
        } else {
          setErrorMessage("Failed to retrieve authentication tokens.");
        }
      } else {
        setErrorMessage("Login failed with status: " + response.status);
      }
    } catch (error) {
      setErrorMessage("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForm = () => {
    setIsRegisterForm(!isRegisterForm); // Toggle between Login and Register form
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image
        src={LoginPic}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
      />

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full p-6">
        {isRegisterForm ? (
          <Register /> // Render the Register form
        ) : (
          <form
            className="bg-white bg-opacity-50 p-8 rounded-lg shadow-2xl w-full max-w-md"
            onSubmit={handleLogin}
          >
            <h1 className="text-2xl font-semibold text-center mb-6 text-pink-800">Sign in to Account</h1>
            <div className="flex justify-center space-x-6 mb-6">
              <FaFacebook className="text-black text-3xl cursor-pointer hover:opacity-75" />
              <FaLinkedin className="text-black text-3xl cursor-pointer hover:opacity-75" />
              <FaGoogle className="text-black text-3xl cursor-pointer hover:opacity-75" />
            </div>
            {/* <div className="mb-4">
              <label className="flex items-center border border-gray-300 rounded-md transform transition-all duration-300 hover:scale-105">
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                  className="w-full px-4 py-3 focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out text-gray-900 bg-white"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </label>
            </div> */}
            <div className="mb-4">
              <label className="flex items-center border border-gray-300 rounded-md transform transition-all duration-300 hover:scale-105">
                <FaEnvelope className="text-black text-4xl p-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out text-gray-900 bg-white"
                  placeholder="Email Address"
                />
              </label>
            </div>

            <div className="mb-4">
              <label className="flex items-center border border-gray-300 rounded-md transform transition-all duration-300 hover:scale-105">
                <FaLock className="text-black text-4xl p-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out text-gray-900 bg-white"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="p-2 text-black"
                >
                  {!showPassword ? <FaEyeSlash className="text-2xl" /> : <FaEye className="text-2xl" />}
                </button>
              </label>
            </div>

            <div className="mb-10 flex justify-between items-center">
              <div className="flex gap-24">
                <Link href="/Customers/ForgotPassword" className="text-blue-800">
                  Forgot password?
                </Link>
                <Link href="/Auth/Register" className=" ml-auto text-blue-800 hover:underline py-50">
                  Create New Account
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-2 bg-pink-700 text-white font-semibold rounded-md hover:bg-black focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 mb-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>
        )}
      </main>
    </div>
  );
};

export default Login1;
