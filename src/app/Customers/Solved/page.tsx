"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketsTablePage = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTableData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_TICKETS_API; // Replace with your actual API endpoint
        if (!apiUrl) {
          throw new Error('API URL is not defined in the .env file');
        }
        const response = await axios.get(`${apiUrl}/tickets`); // Adjust the endpoint if necessary
        setTableData(response.data); // Assuming API response is an array of ticket objects
      } catch (err) {
        setError('Failed to load table data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Solved Tickets
      </h1>
      <div className="overflow-x-auto w-full max-w-4xl">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : tableData.length > 0 ? (
          <table className="table-auto border-collapse border border-gray-300 w-full bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Sl No</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Ticket Raised Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Solved Date</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.productName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.ticketRaisedDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.solvedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500">No data available.</div>
        )}
      </div>
    </div>
  );
};

export default TicketsTablePage;
