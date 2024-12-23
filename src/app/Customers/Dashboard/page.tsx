"use client";

import SmallCard from '../../../Components/Cards/SmallCards/SmallCard';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, CheckCircle, ExternalLink, Loader, Hourglass } from 'lucide-react';


const DashboardComponent = () => {
    const [location, setLocation] = useState('');
    // const [propertyType, setPropertyType] = useState('');
    // const [searchText, setSearchText] = useState('');

    return (
        <div className="flex flex-col items-center justify-start h-full p-4 sm:p-12 ">
            {/* Title aligned to the left */}
            <div className="w-full flex font-nunito mb-4">
                <span className="text-left text-black text-[24px] font-extrabold">Tickets</span>
            </div>

            {/* Container for individual card containers with responsive layout */}
            <div className="flex flex-col sm:flex-row w-full justify-between sm:gap-2 mt-4">
                {/* Card 1 - Left aligned */}
                <div className="flex justify-start w-full sm:w-auto mb-4 sm:mb-0 mr-2 transition-all transform hover:scale-105 hover:shadow-xl duration-300">
                    <Link href="/Customers/Solved">
                        <SmallCard
                            title="Solved"
                            number={1800}
                            icon={<CheckCircle className="w-[35px] h-[35px]" />}
                            bgColor="#369FFF"
                        />
                    </Link>
                </div>

                {/* Card 2 - Centered */}
                <div className="flex justify-center w-full sm:w-auto mb-4 sm:mb-0 mr-2 transition-all transform hover:scale-105 hover:shadow-xl duration-300">
                    <SmallCard
                        title="Open"
                        number={2100}
                        icon={<ExternalLink className="w-[35px] h-[35px]" />}
                        bgColor="#8AC53E"
                    />
                </div>

                {/* Card 3 - Right aligned */}
                <div className="flex justify-end w-full sm:w-auto transition-all transform hover:scale-105 hover:shadow-xl duration-300">
                    <SmallCard
                        title="Under Process"
                        number={1900}
                        icon={<Loader className="w-[35px] h-[35px]" />}
                        bgColor="#FFD143"
                    />
                </div>

                {/* Card 4 - Right aligned */}
                <div className="flex justify-end w-full sm:w-auto transition-all transform hover:scale-105 hover:shadow-xl duration-300">
                    <SmallCard
                        title="Pending"
                        number={1900}
                        icon={<Hourglass className="w-[35px] h-[35px]" />}
                        bgColor="#DB7093"
                    />
                </div>
            </div>

            {/* New row below cards displaying "Group Homepage" and filters */}
            <div className="w-full flex flex-col items-center mt-8">
                {/* Group Homepage Text */}

                {/* Operations Text */}
                {/* <div className="w-full flex font-nunito mb-4">
                    <span className="text-left text-black text-[16px] font-normal">Operations</span>
                </div> */}

                {/* Horizontal line */}
                <div className="w-full border-t-2 border-gray-300 mb-6"></div>

                {/* Happening Today Text */}
                {/* <div className="w-full flex font-nunito mb-4">
                    <span className="text-left text-black text-[16px] font-extrabold">Most Visited Country</span>
                </div> */}

                {/* Display 5 Different VerySmallCard components manually */}

            </div>

            {/* Operations Section */}
            <div className="w-full flex flex-col items-start mt-12">
                {/* Text Booking report */}
                {/* <div className="w-full flex font-nunito mb-4 space-y-4">
                    <span className="text-left text-black text-[16px] font-extrabold">Booking report</span>
                </div> */}

                <div className="w-full flex font-nunito mb-4">
                    <span className="text-left text-black text-[16px] font-extrabold">Filter by Status</span>
                </div>
                {/* Input with Search Button */}
                <div className="flex items-center space-x-2 mb-4 w-full sm:w-auto">
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="flex-grow mt-2 p-2 bg-gray-100 rounded-lg h-[40px] placeholder-black text-black border border-gray-300"
                        placeholder="Enter status"
                    />
                    <button
                        onClick={() => console.log(`Searching for status: ${location}`)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </div>



                {/* Table for Booking Report */}
                <div className="w-full flex font-nunito mb-3">
                    <span className="text-left text-black text-[20px] font-extrabold"> Total Tickets</span>
                </div>
                <div className="w-full mt-3 space-y-6 overflow-x-auto mb-4">
                    <table className="min-w-full table-auto bg-white rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-4 py-2 text-sm font-bold text-black">SL No.</th>
                                <th className="px-4 py-2 text-sm font-bold text-black">Product ID</th>
                                <th className="px-4 py-2 text-sm font-bold text-black">Product Name</th>
                                <th className="px-4 py-2 text-sm font-bold text-black">Query/Issue</th>
                                <th className="px-4 py-2 text-sm font-bold text-black">Reason</th>
                                <th className="px-4 py-2 text-sm font-bold text-black">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Static Data Rows */}
                            <tr>
                                <td className="px-4 py-2 text-sm text-black">001</td>
                                <td className="px-4 py-2 text-sm text-black">12345</td>
                                <td className="px-4 py-2 text-sm text-black">aasbcvb</td>
                                <td className="px-4 py-2 text-sm text-black">Query</td>
                                <td className="px-4 py-2 text-sm text-black">jdxjrj</td>
                                <td className="px-4 py-2 text-sm text-black">Solved</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-black">002</td>
                                <td className="px-4 py-2 text-sm text-black">23456</td>
                                <td className="px-4 py-2 text-sm text-black">aasbcvb</td>
                                <td className="px-4 py-2 text-sm text-black">Query</td>
                                <td className="px-4 py-2 text-sm text-black">jdxjrj</td>
                                <td className="px-4 py-2 text-sm text-black">Solved</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-black">003</td>
                                <td className="px-4 py-2 text-sm text-black">34567</td>
                                <td className="px-4 py-2 text-sm text-black">aasbcvb</td>
                                <td className="px-4 py-2 text-sm text-black">Query</td>
                                <td className="px-4 py-2 text-sm text-black">jdxjrj</td>
                                <td className="px-4 py-2 text-sm text-black">Solved</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 text-sm text-black">004</td>
                                <td className="px-4 py-2 text-sm text-black">45678</td>
                                <td className="px-4 py-2 text-sm text-black">aasbcvb</td>
                                <td className="px-4 py-2 text-sm text-black">Query</td>
                                <td className="px-4 py-2 text-sm text-black">jdxjrj</td>
                                <td className="px-4 py-2 text-sm text-black">Solved</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
