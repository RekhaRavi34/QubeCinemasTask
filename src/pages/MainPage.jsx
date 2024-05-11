import { useState, useEffect } from "react";
import { Pagination } from "antd";
import FirstSection from "../components/FirstSection"
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const MainPage = () => {

    const router = useNavigate();
    const [dataLogs, setDataLogs] = useState([]);
    const [counts, setCounts] = useState({
        failed: 0,
        scheduled: 0,
        downloading: 0,
        cancelled: 0,
        downloaded: 0
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Change this according to your needs

    // Calculate total pages
    const totalPages = dataLogs ? Math.ceil(dataLogs?.appliances?.length / pageSize) : 0;

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
    const slicedData = dataLogs?.appliances?.slice(startIndex, endIndex);

    const fetchData = async () => {
        try {
            const accessResponse = await axios.get(`http://localhost:3000/api/v1/appliances`);
            setDataLogs(accessResponse.data);
            console.log(accessResponse.data)
            const counts = accessResponse.data.appliances.reduce((acc, appliance) => {
                const downloadStatus = appliance.downloadStatus.toLowerCase();
                acc[downloadStatus] = (acc[downloadStatus] || 0) + 1;
                return acc;
            }, {});

            setCounts(counts);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div className="max-w-screen h-screen">
            <div >
                <h1 className="text-[#2D3540] text-4xl font-medium font-sans px-6 py-4">Devices</h1>
            </div>
            <div className="bg-slate-100">
                <FirstSection counts={counts} prevPage={prevPage} goToPage={goToPage} nextPage={nextPage} totalPages={totalPages} />
                <div className="px-6 pt-1 pb-6">
                    <div className="flex flex-row bg-white rounded-md justify-between px-5 py-5" >
                        <div className="flex flex-row ">
                            <div className="relative">
                                <input type="search" id="search" className="block w-full p-2 pr-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 " placeholder="Search" required />
                                <div className="absolute inset-y-0 end-0 flex items-center pr-3 cursor-pointer">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="relative flex items-center pl-4">
                                <button type="button" className="flex items-center text-[#2D3540] px-2 py-2 rounded-md bg-gray-200 text-sm mr-2">
                                    <svg className="w-5 h-3 text-gray-800 mr-1" ariahidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
                                    </svg>
                                    Filter
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-row">

                            <label htmlFor="dropdown" className="mr-2 self-center text-[#69788C] text-xs">Show</label>
                            <select
                                id="dropdown"
                                className="border border-gray-300 rounded-md px-2 py-1 w-20 text-xs w-15"
                            >
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                            </select>
                            {/* Pagination */}
                            <nav aria-label="Page navigation example" className=" text-xs self-center pl-3">
                                <ul className="inline-flex ">
                                    <li>
                                        <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 " onClick={prevPage} disabled={currentPage === 1}>
                                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                            </svg>
                                        </button>
                                    </li>
                                    {totalPages && [...Array(totalPages)].map((_, index) => (
                                        <li key={index} className="font-medium">
                                            <button className={`flex items-center justify-center px-3 h-8 leading-tight text-[#2D3540] bg-white  hover:bg-gray-100 hover:text-gray-700  ${currentPage === index + 1 ? 'text-blue-600 border border-blue-300 bg-blue-100 hover:bg-blue-100 hover:text-blue-700' : ''}`} onClick={() => goToPage(index + 1)}>
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
                    </div>
                    <div className="bg-white pt-3">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage