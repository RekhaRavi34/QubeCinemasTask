import React from 'react'

const FirstSection = ({ counts }) => {
    return (
        <div className="px-6 pt-4 pb-2">
            <div className="bg-[white] flex flex-row px-5 py-4 rounded-md">
                <div className="flex items-center text-sm mr-6">
                    <span className="h-2 w-2 bg-red-500 rounded-full mr-3"></span>
                    <span>{counts.failed} Failed</span>
                </div>
                <div className="flex items-center text-sm mr-6">
                    <span className="h-2 w-2 bg-[#ffcc00] rounded-full mr-3"></span>
                    <span>{counts.cancelled} Cancelled</span>
                </div>
                <div className="flex items-center text-sm mr-6">
                    <span className="h-2 w-2 bg-[#bfbfbf] rounded-full mr-3"></span>
                    <span>{counts.scheduled} Scheduled</span>
                </div>
                <div className="flex items-center text-sm mr-6">
                    <span className="h-2 w-2 bg-[#0099ff] rounded-full mr-3"></span>
                    <span>{counts.downloading} Downloading</span>
                </div>
                <div className="flex items-center text-sm mr-6">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-3"></span>
                    <span>{counts.downloaded} Downloaded</span>
                </div>
            </div>
        </div>
    )
}

export default FirstSection