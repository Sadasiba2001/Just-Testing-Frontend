import React, { useState, useEffect, FC } from 'react';
import { User, ChevronDown } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import CryptoJS from "crypto-js";

const HeaderComponent: FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "your-secure-key";

  const decryptData = (encryptedData: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const encryptedEmail = localStorage.getItem("email");
        if (encryptedEmail) {
          const decryptedEmail = decryptData(encryptedEmail);
          console.log("Decrypted Email:", decryptedEmail);
          const apiUrl = process.env.NEXT_PUBLIC_USER_PROFILE_VIEW_API;
          const response = await fetch(`${apiUrl}?email=${decryptedEmail}`);
          const data = await response.json();
          if (data) {
            if (data.customer_register_data) {
              setUserName(data.customer_register_data.name);
              setUserRole(data.customer_register_data.role);
            }
          }
        } else {
          console.log("No encrypted email found.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <header className="flex items-center justify-between p-4 w-full sm:w-auto">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
          <User className="w-6 h-6 text-gray-600" />
        </div>
        {loading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : errorMessage ? (
          <div className="text-sm text-red-500">{errorMessage}</div>
        ) : (
          <div className="flex flex-col justify-center text-left">
            <span className="font-medium text-black">
              {userName || 'Guest'}
            </span>
            <span className='text-sm text-black'>{userRole || 'Unknown'}</span>
          </div>
        )}
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </div>
    </header>
  );
};

export default HeaderComponent;
