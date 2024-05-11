import React from 'react'
import { useNavigate } from 'react-router-dom';

const TableComp = ({ dataLogs }) => {
    const { appliances } = dataLogs;
    const router = useNavigate();

    return (
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
                {appliances !== undefined && appliances.map((item, index) => (
                    <tr key={index} className="text-xs font-regular align-top" >
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
    )
}

export default TableComp