import { useState, useEffect } from "react";
import { Pagination } from "antd";
import FirstSection from "../components/FirstSection"
import axios from 'axios';
import TableComp from "../components/TableComp";
const MainPage = () => {
    const [dataLogs, setDataLogs] = useState([]);
    const [counts, setCounts] = useState({
        failed: 0,
        scheduled: 0,
        downloading: 0,
        cancelled: 0,
        downloaded: 0
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
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

    const onPageChange = (page, pageSize) => {
        setCurrentPage(page);
    };

    return (
        <div className="max-w-screen h-screen">
            <div >
                <h1 className="text-[#2D3540] text-4xl font-medium font-sans px-6 py-4">Devices</h1>
            </div>
            <div className="bg-slate-100">
                <FirstSection counts={counts} />
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
                            <label htmlFor="dropdown" className="mr-2 self-center text-[#69788C] text-sm">Show</label>
                            <select
                                id="dropdown"
                                className="border border-gray-300 rounded-md px-2 py-1 w-20 text-sm "
                            >
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>
                    <div className="bg-white pt-3">
                        <TableComp dataLogs={dataLogs} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage