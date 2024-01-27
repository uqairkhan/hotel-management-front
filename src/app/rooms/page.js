"use client";
import React, { useState, useEffect } from 'react';
import CustomTable from '../../components/customTable';
import DropDown from "../../components/dropdown";
import { findAllRooms } from '../../services/api';
import Loader from '../../components/loader';

const Rooms = () => {
    const [roomsList, setRoomsList] = useState([])
    const [data,setData]=useState([])
    const [loading, setLoading] = useState(false)
    const [availableRoom, setAvailableRoom] = useState(0)
    useEffect(() => {
        onFetchRooms()
    }, [])
    const onFetchRooms = async () => {
        try {
            setLoading(true)
            const res = await findAllRooms();
            let totalAvailable = 0;
            const newRes = res?.data.map(itm => {
                if (itm.isAvailable)
                    totalAvailable += 1;
                return { ...itm, status: <span className={`border rounded-xl p-1 ${itm.isAvailable ? "bg-green-500" : "bg-orange-500"} text-white text-xs`}>{itm.isAvailable ? "Available" : "Occupied"}</span> }
            })
            setAvailableRoom(totalAvailable)
            setRoomsList(newRes)
            setData(newRes)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }

    const filterLocalData = (roomType) => {
        let filterObj = []
        if (roomType) {
            filterObj = data.filter(itm =>
                itm.roomType.toLowerCase().startsWith(roomType.toLowerCase()))
                setRoomsList(filterObj)
        }else{
            setRoomsList(data)
        }
       
    }

    return (
        <>
            {loading && <Loader />}
            <div className='flex justify-between flex-wrap gap-y-3 mb-2'>
                <span className='text-lg font-medium'>Rooms</span>
                <span className='text-sm font-small'>
                    <span className='text-gray-500'>{roomsList?.length}</span> all rooms
                    <span className='text-green-500'>{" " + availableRoom}</span> available rooms</span>
                <div className='flex justify-between flex-wrap gap-y-3 gap-x-2 mb-2'>
                    <DropDown
                        padding={"p-2"}
                        onChange={(option) =>filterLocalData(option)}
                        placeHolder="All rooms"
                        options={["All rooms","Standard Room", "Deluxe Room", "Suite", "Family Room"]}
                    />
                    <button className='bg-blue-600 p-2 text-white rounded-md text-xs'>
                        Check availability
                    </button>
                </div>
            </div>
            <CustomTable
                rows={[
                    { name: "roomNo", label: "Room" },
                    { name: "roomType", label: "Room Type" },
                    { name: "bedType", label: "Bed Type" },
                    { name: "amenities", label: "Amenities" },
                    { name: "price", label: "Price" },
                    { name: "status", label: "Availability" },
                    { name: "notes", label: "Notes" },


                ]}
                data={roomsList}
            />


        </>
    )
}

export default Rooms;