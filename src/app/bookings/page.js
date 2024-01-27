"use client";
import React, { useState ,useEffect} from 'react';
import CustomTable from '../../components/customTable';
import AddBookingModal from '../../components/modals/addBooking'
import DropDown from "../../components/dropdown";
import Loader from '../../components/loader';
import { findAllBookings } from '../../services/api';
import moment from 'moment';

const eventColor=(status)=>{
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
  
const Bookings = () => {

    const [isModalOpen, setModalOpen] = useState(false);
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
                    status:<span className={`border rounded-xl p-1 ${eventColor(itm.status)}  text-xs`}>{itm.status}</span>
                }
            })
            setBookingsList(filterData)
            setData(filterData)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const filterLocalData = (roomType) => {
        let filterObj = []
        if (roomType) {
            filterObj = data.filter(itm =>
                itm?.roomType.toLowerCase().startsWith(roomType.toLowerCase()))
                setBookingsList(filterObj)
        }else{
            setBookingsList(data)
        }
       
    }
    return (
        <>
         {loading&&<Loader/>}
            <div className='flex justify-between flex-wrap gap-y-3 mb-2'>
                <span className='text-lg font-medium'>Bookings</span>
                <div className='flex justify-between flex-wrap gap-y-3 gap-x-2 mb-2'>
                <DropDown
                padding={"p-2"}
                onChange={(option)=>filterLocalData(option)}
                placeHolder="All bookings"
                options={["All bookings","Standard Room","Deluxe Room","Suite","Family Room"]}
                />
                <button onClick={handleOpenModal} className='bg-blue-600 p-2 text-white rounded-md text-xs'>
                    <dev className="flex">
                        <svg className="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                        </svg>
                        <span>Create New booking</span>
                    </dev>
                </button>
                </div>
            </div>
            <CustomTable
                rows={[
                    { name: "name", label: "Name" },
                    { name: "room", label: "Room" },
                    { name: "roomType", label: "Room type" },
                    { name: "status", label: "Status" },
                    { name: "price", label: "Price" },
                    { name: "noOfPeople", label: "N of people" },
                    { name: "checkIn", label: "Check in" },
                    { name: "checkOut", label: "Check out" },


                ]}
                data={bookingsList}
            />

            <AddBookingModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Booking Form"
                onFetch={onFetchBookings}
            />
        </>
    )
}

export default Bookings;