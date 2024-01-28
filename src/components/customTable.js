import React, { useState, useEffect } from 'react';

export default function CustomTable({ rows, data, pageLimit = 10 }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [column, setColumn] = useState([])
    useEffect(() => {
        setColumn(data.slice(0, pageLimit))
        setCurrentPage(1)
    }, [data])
    const onHandleNextPage = () => {
        const skip = currentPage * pageLimit;
        const limit = skip + pageLimit;
        if (skip < data.length) {
            setColumn(data.slice(skip, limit))
            setCurrentPage(currentPage + 1)
        }
    }
    const onHandlePrevPage = () => {
        const skip = (currentPage - 2) * pageLimit;
        const limit = skip + pageLimit;
        if (skip >= 0) {
            setColumn(data.slice(skip, limit))
            setCurrentPage(currentPage - 1)
        }
    }
    return (
        <>
            <div className="overflow-x-auto mt-5">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            {
                                rows?.map((row, key) => (
                                    <th key={"customTabKey" + key} className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-900 uppercase tracking-wider">{row?.label}</th>

                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            column?.map((rec, recKey) => (
                                <tr key={"recordTab" + recKey}>
                                    {
                                        rows?.map((row, key) => (
                                            <td key={"single_record" + key} className={`px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500 ${row?.className}`}>
                                                {rec[row?.name]}
                                            </td>

                                        ))
                                    }
                                </tr>
                            ))
                        }



                    </tbody>
                </table>
            </div>

            <div className="flex justify-end mr-6 mb-5">
                <div className="flex justify-between gap-x-4">
                    <svg onClick={onHandlePrevPage} className={`w-8 h-8 ${currentPage == 1 ? 'text-blue-400' : 'text-blue-700'} dark:text-white cursor-pointer`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                    </svg>
                    <span>{currentPage}</span>
                    <svg onClick={onHandleNextPage} className={`w-8 h-8 ${(currentPage * pageLimit) > data.length ? 'text-blue-400' : 'text-blue-700'} dark:text-white cursor-pointer`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                    </svg>
                </div>
            </div>
        </>
    )
}