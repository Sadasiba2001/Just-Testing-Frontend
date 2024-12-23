// "use client";

// import React, { useState } from 'react';

// interface FormData {
//   password1: string;
//   password2: string;
// }

// const ForgotPasswordForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({ password1: '', password2: '' });
//   const [message, setMessage] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Check if passwords match
//     if (formData.password1 !== formData.password2) {
//       setMessage('Passwords do not match.');
//       return;
//     }

//     try {
//       const response = await fetch(process.env.NEXT_PUBLIC_FORGOT_PASSWORD_API!, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.status === 200) {
//         const data = await response.json();
//         setMessage(data.message || 'Password updated successfully.');
//       } else {
//         const errorData = await response.json();
//         setMessage(errorData.error || 'Something went wrong.');
//       }
//     } catch (error) {
//       console.error('Network Error:', error);
//       setMessage('Network error. Please try again later.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold text-center mb-6 text-black">Forgot Password</h2>
//         <div className="mb-4">
//           <label
//             htmlFor="password1"
//             className="block text-lg font-medium text-black"
//           >
//             Enter Password:
//           </label>
//           <input
//             type="password"
//             id="password1"
//             name="password1"
//             value={formData.password1}
//             onChange={handleChange}
//             required
//             className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-black"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="password2"
//             className="block text-lg font-medium text-black"
//           >
//             Re-enter Password:
//           </label>
//           <input
//             type="password"
//             id="password2"
//             name="password2"
//             value={formData.password2}
//             onChange={handleChange}
//             required
//             className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-black"
//           />
//         </div>
//         {message && (
//           <p className="text-center text-red-500 mb-4">{message}</p>
//         )}
//         <button
//           type="submit"
//           className="w-full px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
//         >
//           Next
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPasswordForm;


"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

interface FormData {
    password1: string;
    password2: string;
}

const ForgotPasswordForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ password1: "", password2: "" });
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        // Retrieve the email from query parameters
        const queryEmail = new URLSearchParams(window.location.search).get('email');
        if (queryEmail) {
            setEmail(queryEmail);
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePassword1 = () => setShowPassword1(!showPassword1);
    const togglePassword2 = () => setShowPassword2(!showPassword2);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password1 !== formData.password2) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            // Send both password and email to the backend
            const response = await fetch(process.env.NEXT_PUBLIC_PASSWORD_UPDATE_API!, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: formData.password1,
                    email: email, // Add the email here
                }),
            });

            if (response.status === 200) {
                const data = await response.json();
                setMessage(data.message || "Password updated successfully.");
                router.push('/');
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || "Something went wrong.");
            }
        } catch (error) {
            console.error("Network Error:", error);
            setMessage("Network error. Please try again later.");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Forgot Password</h2>
                <div className="mb-4 relative">
                    <label
                        htmlFor="password1"
                        className="block text-lg font-medium text-black"
                    >
                        Enter Password:
                    </label>
                    <input
                        type={showPassword1 ? "text" : "password"}
                        id="password1"
                        name="password1"
                        value={formData.password1}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-black"
                    />
                    <span
                        onClick={togglePassword1}
                        className="absolute right-3 top-10 cursor-pointer text-gray-500"
                    >
                        {showPassword1 ? "👁️" : "🙈"}
                    </span>
                </div>
                <div className="mb-4 relative">
                    <label
                        htmlFor="password2"
                        className="block text-lg font-medium text-black"
                    >
                        Re-enter Password:
                    </label>
                    <input
                        type={showPassword2 ? "text" : "password"}
                        id="password2"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-black"
                    />
                    <span
                        onClick={togglePassword2}
                        className="absolute right-3 top-10 cursor-pointer text-gray-500"
                    >
                        {showPassword2 ? "👁️" : "🙈"}
                    </span>
                </div>
                {message && (
                    <p className="text-center text-red-500 mb-4">{message}</p>
                )}
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                    Next
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
