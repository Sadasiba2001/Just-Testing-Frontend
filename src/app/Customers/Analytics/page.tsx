"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { name: "Solved", value: 1800 },
  { name: "Pending", value: 1900 },
  { name: "Under Processing", value: 1700 },
  { name: "Open", value: 2100 },
];

const COLORS = ["#36A2EB", "#FF6384", "#FFCD56", "#4BC0C0"];

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">Ticket Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-black">Bar Chart</h2>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-black">Pie Chart</h2>
          <PieChart width={500} height={300}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
