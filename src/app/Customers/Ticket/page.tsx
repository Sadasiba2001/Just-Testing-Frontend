"use client";

import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useRouter } from "next/navigation";

const SupportForm = () => {
  const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "your-secure-key";
  const [customerData, setCustomerData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    productName: "",
    category: "Select",
    message: "",
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const router = useRouter();

  const decryptData = (encryptedData: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validFormats = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 40 * 1024; // 40 KB
      const minSize = 10 * 1024; // 10 KB

      if (!validFormats.includes(file.type)) {
        alert("Invalid file format. Only JPG, JPEG, and PNG are allowed.");
        return;
      }

      if (file.size < minSize || file.size > maxSize) {
        alert("File size must be between 10 KB and 40 KB.");
        return;
      }

      setAttachment(file);
    } else {
      setAttachment(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!attachment) {
      alert("Please upload a valid attachment.");
      return;
    }

    try {
      if (!process.env.NEXT_PUBLIC_USER_TICKET_RAISE_VIEW_API) {
        throw new Error("API URL is not defined in environment variables.");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("customerName", formData.customerName);
      formDataToSend.append("customerEmail", formData.customerEmail);
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("attachment", attachment);

      const response = await axios.post(
        process.env.NEXT_PUBLIC_USER_TICKET_RAISE_VIEW_API,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        alert("Ticket raised successfully!");
        setFormData({
          customerName: "",
          customerEmail: "",
          productName: "",
          category: "Select",
          message: "",
        });
        setAttachment(null);
        setFormSubmitted(true);
        router.push("/Submit_success");
      } else {
        alert("Failed to raise ticket. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      router.push("/Submit_success");
    }
  }, [formSubmitted, router]);

  useEffect(() => {
    const fetchData = async () => {
      const encryptedEmail = localStorage.getItem("email");

      if (encryptedEmail) {
        const decryptedEmail = decryptData(encryptedEmail);

        const apiUrl = `${process.env.NEXT_PUBLIC_USER_PROFILE_VIEW_API}?email=${decryptedEmail}`;

        try {
          const response = await fetch(apiUrl);
          if (response.ok) {
            const data = await response.json();
            setCustomerData(data);
            setFormData({
              customerName: data.customer_register_data.name,
              customerEmail: data.customer_register_data.email,
              productName: data.customer_purchase_data
                .map((purchase: any) =>
                  purchase.products
                    .map((product: any) => product.softwareProduct)
                    .flat()
                )
                .flat()
                .join(", "),
              category: "Select",
              message: "",
            });
          } else {
            console.error("Failed to fetch user profile");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("Email not found in localStorage");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-200 text-black">
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full items-center justify-center bg-gray-100 ">
      <main className="flex-1 flex items-center justify-center w-full p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-md p-4 w-full max-w-sm space-y-4 animated-box"
          style={{
            boxShadow: `
              0 4px 6px rgba(0, 0, 0, 0.1),
              0 8px 15px rgba(0, 0, 0, 0.05),
              0 12px 20px rgba(0, 0, 255, 0.2), /* Blue tint */
              0 16px 30px rgba(255, 0, 0, 0.2) /* Red tint */
            `,
          }}
        >
          <h2 className="text-lg font-bold mb-2 text-center text-blue-500">
            Support Form
          </h2>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-black"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Customer Email
            </label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-black"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-black"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-black"
              required
            >
              <option value="Select">Select</option>
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Upload Attachment (10KB to 40KB)
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-black"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-black"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm text-black"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SupportForm;
