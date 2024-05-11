const Pagination = () => {
    return (
        <>
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
        </>
    )
}

export default Pagination