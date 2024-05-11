
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TableSamp = ({ dataLogs }) => {
    const { appliances } = dataLogs;
    const router = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5); // Change this according to your needs

    // Calculate total pages
    const totalPages = appliances ? Math.ceil(appliances.length / pageSize) : 0;

    // Pagination functions
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Slice data based on current page and page size
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const slicedData = appliances?.slice(startIndex, endIndex);

    return (
        <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 divide-y divide-gray-200 ">
                <thead className="text-sm text-gray-700 font-md ">
                    <tr>
                        <th scope="col" className="pl-6  pt-3 pb-6 border-b-3 border-gray-200">Device Serial</th>
                        <th scope="col" className=" py-4 pb-6 border-b-3 border-gray-200">Location</th>
                        <th scope="col" className="pl-12 pt-3 pb-6 border-b-3 border-gray-200">Bandwidth</th>
                        <th scope="col" className="pr-8 pt-3 pb-6 border-b-3 border-gray-200">Status</th>
                        <th scope="col" className="  pt-3 pb-6 border-b-3 border-gray-200">Download Status</th>
                        <th scope="col" className=" pt-3 pb-6 border-b-3 border-gray-200">Os Version</th>
                        <th scope="col" className=" pt-3 pb-6 border-b-3 border-gray-200"></th>
                    </tr>
                </thead>
                <tbody>
                    {slicedData?.map((item, index) => (
                        <tr key={index} className="text-xs font-regular align-top">
                            <td className="pl-6 py-4 text-[#2D3540]">{item.serialNo}</td>
                            <td className="py-4 text-[#2D3540] "><p>{item.theatreName}</p><p className="text-[#0066cc] py-2">{`${item.location.city}, ${item.location.state}, ${item.location.country}`}</p></td>
                            <td className="pl-12 py-4 text-[#2D3540]"><p>{item.bandwidth}</p><p className="text-[#69788C] py-2">{item.avgBandwidth}</p></td>
                            <td className=" py-4 text-[#2D3540]">
                                <div class="flex items-center">
                                    <div class={`h-2.5 w-2.5 rounded-full me-2 ${item.deviceStatus === "Offline" ? "bg-red-500" : "bg-green-500"}`}></div>{item.deviceStatus}
                                </div>
                            </td>
                            <td className=" py-4 text-[#2D3540]">
                                <div class="flex items-center">
                                    <div class={`h-2.5 w-2.5 rounded-full  me-2 
                                ${item.downloadStatus === "Failed" ? "bg-red-500" : ""}
                                ${item.downloadStatus === "Cancelled" ? "bg-[#ffcc00]" : ""} 
                                ${item.downloadStatus === "Scheduled" ? "bg-[#bfbfbf]" : ""}
                                ${item.downloadStatus === "Downloading" ? "bg-[#0099ff]" : ""}
                                ${item.downloadStatus === "Downloaded" ? "bg-green-500" : ""}`}></div>{item.downloadStatus}
                                </div>
                            </td>
                            <td className=" py-4 text-[#2D3540] ">{item.osVersion}</td>
                            <td className=" py-4 ">
                                <span className=' font-medium text-[#2D3540] px-3 py-2 rounded-md  bg-slate-200 cursor-pointer' onClick={() => router(`/devices/${item.serialNo}`)}>View</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 " onClick={prevPage} disabled={currentPage === 1}>
                            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index}>
                            <button className={`flex items-center justify-center px-3 h-8 leading-tight text-[#2D3540] bg-white  hover:bg-gray-100 hover:text-gray-700  ${currentPage === index + 1 ? 'text-blue-600 border-blue-300 bg-blue-100 hover:bg-blue-100 hover:text-blue-700' : ''}`} onClick={() => goToPage(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white rounded-e-lg hover:bg-gray-100 hover:text-gray-700" onClick={nextPage} disabled={currentPage === totalPages}><svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg></button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default TableSamp;