import { useState, useEffect } from "react";
import FirstSection from "../components/FirstSection"
import axios from 'axios';

const MainPage = () => {
    const [dataLogs, setDataLogs] = useState([]);


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/appliances');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setDataLogs(data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
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
            <div className="bg-slate-200">
                <FirstSection />
                <div>
                    <div className="bg-[white]"></div>
                </div>
            </div>
        </div>
    )
}

export default MainPage