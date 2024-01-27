"use client";
import React, { useState, useEffect } from 'react';
import CustomCalendar from '../../components/customCalendar';
import AddBookingModal from '../../components/modals/addBooking'
import Loader from '../../components/loader';
import { findAllRooms,findAllBookings,updateBooking } from '../../services/api';
import isAuth from '@/HOC/isAuth';

const Calendar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [romsList, setRoomsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [bookingsList,setBookingsList]=useState([])
  useEffect(() => {
      onFetchRooms()
      onFetchBookings()
  }, [])
  const onFetchRooms = async () => {
      try {
          setLoading(true)
          const res = await findAllRooms()
          setRoomsList(res?.data)
          setLoading(false)
      } catch (err) {
          setLoading(false)
      }
  }
  const onFetchBookings = async () => {
    try {
        setLoading(true)
        const res = await findAllBookings();
        const filterData=res?.data?.map(itm=>{
          return {...itm,
              roomNo:itm?.room?.roomNo||"",
          }
      })
        setBookingsList(filterData)
        setLoading(false)
    } catch (err) {
        setLoading(false)
    }
}
const handleBookingUpdate=async(event)=>{
  try{
   if(!event)
   return
   await updateBooking(event._id,{startDate:event.startDate,endDate:event.endDate,roomNo:event.roomNo})

  }catch(err){

  }
}
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      {loading&&<Loader/>}
    <div className='flex justify-between flex-wrap gap-y-3 mb-2'>
     <span className='text-lg font-medium'>Calendar</span>
     <button onClick={handleOpenModal} className='bg-blue-600 p-2 text-white rounded-md text-xs'>
      <dev className="flex">
      <svg class="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
    </svg>
     <span>Create New booking</span>
     </dev>
      </button>
    </div>
   <CustomCalendar
   rooms={romsList}
   bookedRooms={bookingsList}
   setBookedRooms={setBookingsList}
   handleBookingUpdate={handleBookingUpdate}
   />

   <AddBookingModal 
   isOpen={isModalOpen} 
   onClose={handleCloseModal}
   title="Booking Form"
   onFetch={onFetchBookings}
   />
        
    </>
  );
};

export default isAuth(Calendar);






