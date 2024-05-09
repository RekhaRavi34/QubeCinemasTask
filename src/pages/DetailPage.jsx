import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailPage = ({ }) => {
    const { deviceId } = useParams();

    const [deviceDetail, setSetDeviceDetail] = useState({});

    const getdeviceDetail = async (deviceId) => {
        try {
            const res = await axios.get(
                `http://localhost:3000/api/v1/appliance/${deviceId}/info`
            );
            setSetDeviceDetail(res?.data);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        if (deviceId) {
            getdeviceDetail(deviceId);
        }
    }, [deviceId]);



    return (
        <div className="max-w-screen h-screen bg-slate-100">
            <div className='px-8 py-5'>
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: 'Devices',
                            href: '/devices'

                        },
                        {
                            title: `${deviceDetail.serialNo}`,

                        }
                    ]}
                />
            </div>
            <div className='bg-white px-7 pt-5 pb-2'>
                <div className='flex flex-row justify-between'>
                    <h1 className='font-sans font-medium text-4xl'>{deviceDetail.serialNo}</h1>
                    <div className='flex flex-row '>
                        <div className="flex flex-row font-medium items-center text-sm mr-6 bg-slate-100 px-2.5 py-2 rounded-md">
                            <svg className="w-4 h-4 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                            </svg>
                            <span className='ml-2'>SpeedTest</span>
                        </div>
                        <div className="flex flex-row font-medium items-center text-sm mr-6 bg-slate-100 px-2.5 py-2 rounded-md">
                            <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 17V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M5 15V1m8 18v-4" />
                            </svg>
                            <span className='ml-2'>Logs</span>
                        </div>
                    </div>
                </div>
                <h4 className='font-sans font-medium text-xl mt-5'>{deviceDetail.theatreName}</h4>
                <h5 className='font-sans text-[#69788C] font-normal text-l mt-3'>{ }</h5>
                <div className='flex flex-row mt-5 font-medium'>
                    <div className="flex items-center text-sm mr-3 bg-slate-100 px-1.5 py-1.5 rounded-full">
                        <span className={`h-3 w-3 rounded-full mr-3  ${deviceDetail.deviceStatus === "Offline" ? "bg-red-500" : "bg-green-500"}`}></span>
                        <span>{deviceDetail.deviceStatus}</span>
                    </div>
                    <div className="flex flex-row font-medium items-center text-sm mr-6 bg-slate-100 px-1.5 py-1.5 rounded-full">
                        <svg className="w-4 h-4 text-gray-800 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 19V.352A3.451 3.451 0 0 0 7.5 0a3.5 3.5 0 0 0-3.261 2.238A3.5 3.5 0 0 0 2.04 6.015a3.518 3.518 0 0 0-.766 1.128c-.042.1-.064.209-.1.313a3.34 3.34 0 0 0-.106.344 3.463 3.463 0 0 0 .02 1.468A4.016 4.016 0 0 0 .3 10.5l-.015.036a3.861 3.861 0 0 0-.216.779A3.968 3.968 0 0 0 0 12a4.032 4.032 0 0 0 .107.889 4 4 0 0 0 .2.659c.006.014.015.027.021.041a3.85 3.85 0 0 0 .417.727c.105.146.219.284.342.415.072.076.148.146.225.216.1.091.205.179.315.26.11.081.2.14.308.2.02.013.039.028.059.04v.053a3.506 3.506 0 0 0 3.03 3.469 3.426 3.426 0 0 0 4.154.577A.972.972 0 0 1 9 19Zm10.934-7.68a3.956 3.956 0 0 0-.215-.779l-.017-.038a4.016 4.016 0 0 0-.79-1.235 3.417 3.417 0 0 0 .017-1.468 3.387 3.387 0 0 0-.1-.333c-.034-.108-.057-.22-.1-.324a3.517 3.517 0 0 0-.766-1.128 3.5 3.5 0 0 0-2.202-3.777A3.5 3.5 0 0 0 12.5 0a3.451 3.451 0 0 0-1.5.352V19a.972.972 0 0 1-.184.546 3.426 3.426 0 0 0 4.154-.577A3.506 3.506 0 0 0 18 15.5v-.049c.02-.012.039-.027.059-.04.106-.064.208-.13.308-.2s.214-.169.315-.26c.077-.07.153-.14.225-.216a4.007 4.007 0 0 0 .459-.588c.115-.176.215-.361.3-.554.006-.014.015-.027.021-.041.087-.213.156-.434.205-.659.013-.057.024-.115.035-.173.046-.237.07-.478.073-.72a3.948 3.948 0 0 0-.066-.68Z" />
                        </svg>
                        <span>{deviceDetail.storage}</span>
                    </div>
                </div>
                <hr className=" h-1 mt-3 bg-gray-100 border-0 rounded "></hr>
                <div className='flex flex-row mt-5'>
                    <h4 className='font-sans font-medium text-l text-[#69788C] mr-8'>Details</h4>
                    <h4 className='font-sans font-medium text-l text-[#69788C] mr-8'>Content</h4>
                    <h4 className='font-sans font-medium text-l text-[#69788C] mr-8'>Bandwidth</h4>
                </div>
            </div>
            <div className='pt-7 px-7 pb-7'>
                <div className='bg-white rounded-md px-7 py-7 grid grid-cols-4 gap-6 shadow-md'>
                    <div><p className='font-medium text-sm'>Device Serial</p><p className=' font-regular text-base'>{deviceDetail.serialNo}a</p></div>
                    <div><p className='font-medium text-sm'>Location</p><p className=' font-regular text-base'>{deviceDetail.serialNo}</p></div>
                    <div><p className='font-medium text-sm'>City</p><p className=' font-regular text-base'>{deviceDetail.serialNo}a</p></div>
                    <div><p className='font-medium text-sm'>ISP Payment Responsibility</p><p className=' font-regular text-base'>{deviceDetail.ispPaymentResponsibility}</p></div>
                    <div><p className='font-medium text-sm'>Bandwidth</p><p className='  font-regular text-base'>{deviceDetail.bandwidth}</p></div>
                    <div><p className='font-medium text-sm'>Average Bandwidth</p><p className=' font-regular text-base'>{deviceDetail.avgBandwidth}</p></div>
                    <div><p className='font-medium text-sm'>Location</p><p className='  font-regular text-base'>{deviceDetail.serialNo}</p></div>
                    <div><p className='font-medium text-sm'>Plan Start Date</p><p className='  font-regular text-base'>{deviceDetail.planStartDate}</p></div>
                    <div><p className='font-medium text-sm'>Download Status</p><p className=' font-regular text-base'>{deviceDetail.downloadStatus}</p></div>
                    <div><p className='font-medium text-sm'>Os Version</p><p className='  font-regular text-base'>{deviceDetail.osVersion}</p></div>
                    <div><p className='font-medium text-sm'>Storage Available</p><p className=' font-regular text-base'>{deviceDetail.storage}</p></div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage