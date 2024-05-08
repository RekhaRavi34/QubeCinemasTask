import React from 'react'

const FirstSection = () => {
    return (
        <div className="px-6 pt-4 pb-2">
            <div className="bg-[white] flex flex-row px-5 py-2 rounded-md">
                <div className="flex items-center text-sm mr-6">
                    <span className="h-2 w-2 bg-red-500 rounded-full mr-3"></span>
                    <span>Failed</span>
                </div>
                <div className="flex items-center text-sm mr-6">
                    <span className="h-2 w-2 bg-[#ffcc00] rounded-full mr-3"></span>
                    <span>Cancelled</span>
                </div>
                <div className="flex items-center text-sm mr-6">
                    <span className="h-2 w-2 bg-[#bfbfbf] rounded-full mr-3"></span>
                    <span>Scheduled</span>
                </div>
                <div className="flex items-center text-sm mr-6">
                    <span className="h-2 w-2 bg-[#0099ff] rounded-full mr-3"></span>
                    <span>Downloading</span>
                </div>
                <div className="flex items-center text-sm mr-6">
                    <span className="h-2 w-2 bg-[#008000] rounded-full mr-3"></span>
                    <span>Downloaded</span>
                </div>
            </div>
        </div>
    )
}

export default FirstSection