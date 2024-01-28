"use client";

import React from 'react';
import CleanlinessChart from '../../components/CleanlinessChart';
import HouseKeepingChart from '../../components/HouseKeepingChart';
import Input from '../../components/input';
import CustomTable from '../../components/customTable';

const HouseKeeping = () => {
    return (
        <>
            <div className='flex flex-wrap lg:flex-nowrap gap-x-3 gap-y-3'>
                <div className='border border-gray-300 p-3 w-full rounded-lg lg:w-6/12'>
                    <span className='font-medium text-lg'>House keeping management</span>
                    <HouseKeepingChart />
                </div>

                <div className='border border-gray-300 p-3 w-full rounded-lg lg:w-6/12'>
                    <span className='font-medium text-lg'>Cleanliness score</span>
                    <CleanlinessChart />
                </div>
            </div>

            <div className='mt-5 border border-gray-300 p-3 w-full rounded-lg'>
                <div className='flex flex-wrap gap-x-3 gap-y-3 justify-between'>

                    <span className='font-medium text-lg'>Cleaning schedule</span>
                    <Input
                        marginBottom="mb-1"
                        padding="p-2"
                        inputProps={{
                            name: "name",
                            type: "text",
                            placeHolder: "Search",
                            required: true,
                            //onChange: handleInputChange

                        }} />
                </div>

                <CustomTable
                    pageLimit={5}
                    rows={[
                        { name: "room", label: "Room" },
                        { name: "chores", label: "Chores" },
                        { name: "staff", label: "Staff" },
                        { name: "startDate", label: "Start Date" },
                        { name: "endDate", label: "End Date" },
                        { name: "time", label: "Time" },
                        {
                            name: "status",
                            label: "Status"
                        },
                    ]}
                    data={[
                        {
                            room: "101", chores: "xxxxx", staff: "(00971)515885", startDate: "02/29/2024", endDate: "02/29/2024", time: "02:00pm",
                            status: <span className={`border rounded-xl p-1 bg-yellow-500 text-white text-xs`}>{"in progress"}</span>
                        },
                        {
                            room: "101", chores: "xxxxx", staff: "(00971)515885", startDate: "02/29/2024", endDate: "02/29/2024", time: "02:00pm",
                            status: <span className={`border rounded-xl p-1 bg-yellow-500 text-white text-xs`}>{"in progress"}</span>
                        },
                        {
                            room: "101", chores: "xxxxx", staff: "(00971)515885", startDate: "02/29/2024", endDate: "02/29/2024", time: "02:00pm",
                            status: <span className={`border rounded-xl p-1 bg-yellow-500 text-white text-xs`}>{"in progress"}</span>
                        },
                        {
                            room: "101", chores: "xxxxx", staff: "(00971)515885", startDate: "02/29/2024", endDate: "02/29/2024", time: "02:00pm",
                            status: <span className={`border rounded-xl p-1 bg-yellow-500 text-white text-xs`}>{"in progress"}</span>
                        },
                        {
                            room: "101", chores: "xxxxx", staff: "(00971)515885", startDate: "02/29/2024", endDate: "02/29/2024", time: "02:00pm",
                            status: <span className={`border rounded-xl p-1 bg-yellow-500 text-white text-xs`}>{"in progress"}</span>
                        },
                        {
                            room: "101", chores: "xxxxx", staff: "(00971)515885", startDate: "02/29/2024", endDate: "02/29/2024", time: "02:00pm",
                            status: <span className={`border rounded-xl p-1 bg-yellow-500 text-white text-xs`}>{"in progress"}</span>
                        },
                    ]}
                />
            </div>
        </>
    )
}

export default HouseKeeping;