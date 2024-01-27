"use client";
import React, { useState, useEffect } from 'react';
import OccupancyPeiChart from '../../components/OccupancyChart';
import ReservationStatisticChart from '../../components/ReservationStatisticChart';
import CustomTable from '../../components/customTable';
import { findAllBookings, roomAvailableCount } from '../../services/api';
import Loader from '../../components/loader';
import moment from 'moment';


const eventColor = (status) => {
    switch (status) {
        case 'CHECKED_OUT':
            return 'bg-red-400 text-white';
        case 'CHECK_IN':
            return 'bg-green-400 text-white';
        case 'CONFIRMED':
            return 'bg-yellow-400 text-white';
        case 'STAYING':
            return 'bg-blue-400 text-white';
        default:
            return 'bg-gray-400 text-white';
    }
}
const Dashboard = () => {
    const [bookingsList, setBookingsList] = useState([])
    const [loading, setLoading] = useState(false)
    const [weekDays, setWeekDays] = useState([]);
    const [chartSeries, setChartSeries] = useState([])
    const [occupancyChartData, setOccupancyChartData] = useState([])
    const [totalRooms, setTotalRooms] = useState(0)
    useEffect(() => {
        onFetchBookings()
        getWeekdayDates(startOfWeek);
    }, [])

    // Get the current date
    const currentDate = moment();
    // Get the start of the current week (Sunday)
    const [startOfWeek, setStartOfWeek] = useState(currentDate.clone().startOf('week'))
    // Get the start of the previous week
    const startOfPrevWeek = startOfWeek.clone().subtract(1, 'week');
    // Get the start of the next week
    const startOfNextWeek = startOfWeek.clone().add(1, 'week');

    //set weekly days
    const getWeekdayDates = (start) => {
        setStartOfWeek(start)
        const weekdays = [];
        for (let i = 0; i < 7; i++) {
            weekdays.push(start.clone().add(i, 'days'));
        }
        setWeekDays(weekdays)
        return weekdays;
    };

    //handle next and back clicks
    const handleBackClick = () => {
        getWeekdayDates(startOfPrevWeek);

    }
    const handleNextClick = () => {
        getWeekdayDates(startOfNextWeek);

    }
    //*********************************** */

    const onFetchBookings = async () => {
        try {
            setLoading(true)
            const daylilyBooking = await findAllBookings({ startDate: new Date() })
            const availableRooms = await roomAvailableCount()
            setOccupancyChartData([
                { label: availableRooms?.data.available + " Available", value: availableRooms?.data.available },
                { label: availableRooms?.data.notAvailable + " Occupied", value: availableRooms?.data.notAvailable },
            ])
            setTotalRooms(availableRooms?.data.available + availableRooms?.data.notAvailable)
            const filterData = daylilyBooking?.data?.map(itm => {
                return {
                    ...itm,
                    room: itm?.room?.roomNo || "",
                    price: itm?.room?.price || "",
                    roomType: itm?.room?.roomType || "",
                    checkIn: moment(itm.startDate).format('DD/MMM/YYYY'),
                    checkOut: moment(itm.endDate).format('DD/MMM/YYYY'),
                    status: <span className={`border rounded-xl p-1 ${eventColor(itm?.status)} text-xs`}>{itm.status}</span>
                }
            })
            setBookingsList(filterData)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (weekDays.length)
            onFetchWeeklyBookings()
    }, [weekDays])
    const onFetchWeeklyBookings = async () => {
        try {
            setLoading(true)
            const weeklyBooking = await findAllBookings({ startDate: new Date(weekDays[0]), endDate: new Date(weekDays[weekDays.length - 1]) })
            const series = []
            let status = {};
            weekDays.map(itm => {
                status[moment(itm).format("ddd")] = {}
            })
            weeklyBooking?.data?.map((itm, index) => {
                const findStatus = series.find(ser => ser.label == itm.status)
                if (!findStatus) {
                    series.push({ data: [], label: itm.status })
                }
                const startDay = moment(itm.startDate).format("ddd");
                const endDay = moment(itm.endDate).format("ddd")
                if (status.hasOwnProperty(startDay)) {
                    if (status[startDay][itm.status]) {
                        status[startDay][itm.status] += 1
                    } else {
                        status[startDay][itm.status] = 1;
                    }
                } else if (status.hasOwnProperty(endDay)) {
                    if (status[startDay][itm.status]) {
                        status[startDay][itm.status] += 1
                    } else {
                        status[startDay][itm.status] = 1;
                    }
                }
            })

            const filterSeries = series.map(itm => {
                let data = [];
                Object.keys(status).forEach(key => {
                    if (status[key][itm.label]) {
                        data.push(status[key][itm.label])
                    } else {
                        data.push(0)
                    }

                });
                itm.data = data;
                return itm;
            })
            console.log("asdfsfasfd", filterSeries)
            setChartSeries(filterSeries)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }


    return (
        <>
            {loading && <Loader />}
            <div className='flex flex-wrap lg:flex-nowrap gap-x-3 gap-y-3'>
                <div className='border border-gray-300 p-3 w-full rounded-lg lg:w-8/12'>
                    <span className='font-medium text-lg'>Today Bookings</span>

                    <CustomTable
                        rows={[
                            { name: "name", label: "Name" },
                            { name: "room", label: "Room" },
                            { name: "price", label: "Price" },
                            { name: "checkIn", label: "Checkin" },
                            {
                                name: "status",
                                label: "Status"
                            },
                        ]}
                        data={bookingsList}
                        pageLimit={3}
                    />

                </div>
                <div className='border border-gray-300 p-3 rounded-lg w-full lg:w-4/12'>
                    <span className='font-medium text-lg'>Occupancy</span>
                    {occupancyChartData.length ? <OccupancyPeiChart
                        data={occupancyChartData}
                    /> : null}
                    <div>
                        <span>{totalRooms} Total Rooms</span>
                    </div>
                </div>
            </div>


            <div className='border border-gray-300 p-3 rounded-lg w-1/1 mt-3'>
                <div className='flex justify-between flex-wrap'>
                    <div>
                        <span className='font-medium text-lg'>Reservation Statistic</span>
                    </div>
                    <div className='flex mt-2 text-sm'>
                        <svg onClick={handleBackClick} className="cursor-pointer w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                        </svg>
                        {weekDays.length ? <span>{
                            moment(weekDays[0]).format("MMM,DD,YYYY") + " - " + moment(weekDays[weekDays.length - 1]).format("MMM,DD,YYYY")
                        }
                        </span> : null}
                        <svg onClick={handleNextClick} className="cursor-pointer w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                        </svg>
                    </div>
                </div>

                <ReservationStatisticChart
                    xLabels={weekDays?.map(itm => moment(itm).format("ddd"))}
                    series={chartSeries}
                />
            </div>

        </>
    )
}

export default Dashboard;