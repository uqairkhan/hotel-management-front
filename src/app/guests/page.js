"use client";
import React, { useState,useEffect } from 'react';
import CustomTable from '../../components/customTable';
import DropDown from "../../components/dropdown";
import Input from '../../components/input';
import Loader from '../../components/loader';
import { findAllBookings } from '../../services/api';
import moment from 'moment';
import { toast } from 'react-toastify'

const Guests = () => {
    const [bookingsList, setBookingsList] = useState([])
    const [loading, setLoading] = useState(false)
    const [data,setData]=useState([])

    useEffect(() => {
        onFetchBookings()
    }, [])
    const onFetchBookings = async () => {
        try {
            setLoading(true)
            const res = await findAllBookings()
            const filterData=res?.data?.map(itm=>{
                return {...itm,
                    room:itm?.room?.roomNo||"",
                    price:itm?.room?.price||"",
                    roomType:itm?.room?.roomType||"",
                    checkIn:moment(itm.startDate).format('DD/MMM/YYYY'),
                    checkOut:moment(itm.endDate).format('DD/MMM/YYYY'),
                    status:<span className={`border rounded-xl p-1 ${itm?.room?.isAvailable?'bg-green-400':'bg-gray-400'} text-white text-xs`}>
                        {itm?.room?.isAvailable?"Active":"Inactive"}
                        </span>
                }
            })
            setBookingsList(filterData)
            setData(filterData)
            setLoading(false)
        } catch (err) {
            toast(err?.message, {type:"error"});
            setLoading(false)
        }
    }

    const filterByRoomType = (roomType) => {
        let filterObj = []
        if (roomType) {
            filterObj = data.filter(itm =>
                itm?.roomType.toLowerCase().startsWith(roomType.toLowerCase()))
                setBookingsList(filterObj)
        }else{
            setBookingsList(data)
        }
       
    }
    const filterByName = (name) => {
        let filterObj = []
        if (name) {
            filterObj = data.filter(itm =>
                itm?.name.toLowerCase().startsWith(name.toLowerCase()))
                setBookingsList(filterObj)
        }else{
            setBookingsList(data)
        }
       
    }
    return (
        <>
         {loading&&<Loader/>}
            <div className='flex justify-between flex-wrap gap-y-3 gap-x-3 mb-2'>
                <span className='text-lg font-medium'>Guests list</span>
                <span className='text-sm font-small'><span className='text-green-500'>{data.length}</span> guests are staying now</span>
                <div className='flex justify-between gap-y-2 gap-x-2 mb-2'>
                    <DropDown
                        padding={"p-2"}
                        onChange={(option) => filterByRoomType(option)}
                        placeHolder="All rooms"
                        options={["All rooms","Standard Room", "Deluxe Room", "Suite", "Family Room"]}
                    />
                    <Input
                        marginBottom="mb-1"
                        padding="p-2"
                        inputProps={{
                            name: "name",
                            type: "text",
                            placeHolder: "Search",
                            required: true,
                            onChange: (e)=>filterByName(e.target.value)

                        }} />
                </div>
            </div>
            <CustomTable
                rows={[
                    { name: "name", label: "name" },
                    { name: "room", label: "Room" },
                    { name: "checkIn", label: "checkIn" },
                    { name: "status", label: "status" },


                ]}
                data={bookingsList}
            />

           
        </>
    )
}

export default Guests;