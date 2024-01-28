
import React, { useState, useEffect } from 'react';
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

const CustomCalendar = ({rooms=[],bookedRooms=[],setBookedRooms,handleBookingUpdate}) => {
  const [weekDays, setWeekDays] = useState([]);
  const [monthDays, setMonthDays] = useState([]);
  const [calendarType, setCalendarType] = useState("Weekly")
  
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
  //set daily
  const getDailyDate = (start) => {
    setWeekDays([new Date()])
  }
  useEffect(() => {
    getWeekdayDates(startOfWeek);
  }, [])
  const handleCalendarType = (type) => {
    setCalendarType(type)
    if (type == "Weekly") {
      getWeekdayDates(currentDate.clone().startOf('week'));
    }
    if(type=="Monthly"){
      let startOfTheMonth=moment().startOf('month');
      getWeekdayDates(startOfTheMonth.clone().startOf('week'));
      setMonthDays(getDaysInMonth(moment().format("YYYY"),moment().format("MM")))
    }
    if (type == "Daily") {
      getDailyDate()
    }
  }

  //handle next and back clicks
  const handleBackClick = () => {
    if (calendarType == "Weekly") {
      getWeekdayDates(startOfPrevWeek);
    }
    if (calendarType == "Daily") {
      const startDate = moment(weekDays[0]);
      const newDate = startDate.subtract(1, 'days');
      setWeekDays([newDate])
    }
   
    if (calendarType == "Monthly") {
      const startDate = moment(weekDays[weekDays.length-1]);
      const newDate = startDate.subtract(1, 'months');
      let startOfTheMonth=moment(newDate).startOf('month');
      getWeekdayDates(startOfTheMonth.clone().startOf('week'));
      setMonthDays(getDaysInMonth(moment(newDate).format("YYYY"),moment(newDate).format("MM")))
    }
  }
  const handleNextClick = () => {
    if (calendarType == "Weekly") {
      getWeekdayDates(startOfNextWeek);
    }
    if (calendarType == "Daily") {
      const startDate = moment(weekDays[0]);
      const newDate = startDate.add(1, 'days');
      setWeekDays([newDate])
    }
    if (calendarType == "Monthly") {
      const startDate = moment(weekDays[weekDays.length-1]);
      const newDate = startDate.add(1, 'months');
      let startOfTheMonth=moment(newDate).startOf('month');
      getWeekdayDates(startOfTheMonth.clone().startOf('week'));
      setMonthDays(getDaysInMonth(moment(newDate).format("YYYY"),moment(newDate).format("MM")))
    }
  }


  //*****************************Drag events************** */
  const onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };
  const onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };
  const onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    // element.style.background = '#d8d8d8cf';
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };
  const onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };
  const onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };
  const onDrop = (evt) => {
    const slot = evt.currentTarget.id.split("/")
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let eventId = evt.dataTransfer.getData("text/plain");
    let findEvent = bookedRooms?.map(itm => {
      if (itm._id.toString() == eventId.toString()) {
        if (daysCount(itm.startDate, itm.endDate) > 1) {
          const startDate = moment(slot[0]);
          const daysToAdd = daysCount(itm.startDate, itm.endDate) - 1;
          const newDate = startDate.add(daysToAdd, 'days');
          itm.endDate = new Date(newDate)
        } else {
          itm.endDate = new Date(slot[0])
        }
        itm.startDate = new Date(slot[0])
        itm.roomNo = slot[1]

      }

      return itm
    })
      const changedEvent=findEvent.find(itm=>itm._id==eventId)
      handleBookingUpdate(changedEvent)
    setBookedRooms(findEvent)
  };



  const daysCount = (date1, date2) => {
    const startDate = moment(date1);
    const endDate = moment(date2);
    const daysDifference = endDate.diff(startDate, 'days');
    return daysDifference + 1
  }


  const filterColSpan = (rom) => {
    let filterRecord = [];
    for (var i = 0; i <= weekDays.length - 1; i++) {
      const day = weekDays[i];
      let isFindBooking = bookedRooms.find(book => {
        const date1 = moment(day);
        const date2 = moment(book.startDate);
        const date3 = moment(book.endDate);

        if ((date1.isSame(date2, 'day')||date1.isSame(date3, 'day')) && rom.roomNo == book.roomNo) {
          if (daysCount(book?.startDate, book?.endDate) > 1) {
            i += daysCount(book?.startDate, book?.endDate) - 1
          }
          return true;
        }
      })

      filterRecord.push({ day, booking: isFindBooking ? isFindBooking : null })

    }
    return filterRecord
  }


  //generate all month days
  function getDaysInMonth(year, month) {
    const startOfMonth = moment(`${year}-${month}-01`);
    const endOfMonth = startOfMonth.clone().endOf('month');
  
    const daysArray = [];
    let currentDate = startOfMonth.clone();
  
    while (currentDate.isSameOrBefore(endOfMonth, 'day')) {
      daysArray.push(currentDate.format('YYYY-MM-DD'));
      currentDate.add(1, 'day');
    }
  
    return daysArray;
  }
  
  return (
    <>
      <div className='flex justify-between flex-wrap gap-y-3'>

        <div className='flex mt-2 text-sm'>
          <svg onClick={handleBackClick} className="cursor-pointer w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
          </svg>
          {weekDays.length ? <span>{
          calendarType=="Monthly"? moment(weekDays[weekDays.length-1]).format("MMM, YYYY"):calendarType=="Daily"? moment(weekDays[0]).format("ddd DD, YYYY"):
          moment(weekDays[0]).format("ddd DD, YYYY") + " - " + moment(weekDays[weekDays.length - 1]).format("ddd DD, YYYY")}</span> : null}
          <svg onClick={handleNextClick} className="cursor-pointer w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
          </svg>
        </div>

        <div className='flex text-sm'>
          <div onClick={() => handleCalendarType("Daily")} className={`cursor-pointer border ${calendarType != "Daily" ? "bg-gray-100" : "bg-violet-500 text-white"}  p-2 rounded-lg`}>Daily</div>
          <div onClick={() => handleCalendarType("Weekly")} className={`cursor-pointer border ${calendarType != "Weekly" ? "bg-gray-100 " : "bg-violet-500 text-white"} p-2 rounded-lg`}>Weekly</div>
          <div onClick={() => handleCalendarType("Monthly")} className={`cursor-pointer border ${calendarType != "Monthly" ? "bg-gray-100 " : "bg-violet-500 text-white"} p-2 rounded-lg`}>Monthly</div>
        </div>


      </div>

      <div className="overflow-x-auto mt-5">
        <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-400">
         {calendarType!="Monthly"&& <thead>
            <tr>
             {calendarType!="Monthly"&& <th key={"customTabKey"} className="border border-slate-300 px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-900 uppercase tracking-wider">
                {"Number"}
              </th>}

              {
                weekDays?.map((day, key) => (
                  <th key={"currentDay" + key} className="border border-slate-300 px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-900 uppercase tracking-wider">
                    {moment(day).format(calendarType=="Monthly"?"ddd DD":"ddd, DD")}
                  </th>

                ))
              }

            </tr>
          </thead>}

          <tbody className="bg-white divide-y divide-gray-200">
            {calendarType!="Monthly"?
              rooms?.map((rom, key) => {
                return <tr key={"eventRow" + key}>
                  <td key={"single_record"} className={`border border-slate-300 px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500 ${''}`}>
                    {rom?.roomNo}
                  </td>
                  {
                    filterColSpan(rom)?.map((record, dayKey) => {
                      const findBooking = record.booking;
                      const day = record.day;
                      return findBooking ?
                        <td
                          draggable={findBooking?.status=="CHECKED_OUT"?false:true}
                          onDragStart={(e) => onDragStart(e)}
                          onDragEnd={(e) => onDragEnd(e)}
                          id={findBooking?._id}
                          colSpan={daysCount(findBooking?.startDate, findBooking?.endDate)}
                          key={"single_record"} className={`no-copy border border-slate-300 px-2 py-1 whitespace-no-wrap text-xs leading-5 font-medium text-gray-500 ${eventColor(findBooking.status)}`}>
                         <div className='flex justify-between flex-wrap'>
                          <span>{findBooking?.name}</span>
                          <span>{findBooking?.status}</span>
                          <span>{moment(findBooking?.startDate).format("ddd DD, YYYY") + " - " + moment(findBooking?.endDate).format("ddd DD, YYYY")}</span>
                         </div>
                        </td> :
                        <td
                          id={moment(day).toISOString() + "/" + rom?.roomNo}
                          onDragLeave={(e) => onDragLeave(e)}
                          onDragEnter={(e) => onDragEnter(e)}
                          onDragEnd={(e) => onDragEnd(e)}
                          onDragOver={(e) => onDragOver(e)}
                          onDrop={(e) => onDrop(e, true, "Completed")}
                          key={"single_record"} className={`border border-slate-300 px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500 ${''}`}>
                          {""}
                        </td>

                    })
                  }
                </tr>
              })
              : 
              [1,2,3,4,5].map((currentDay,dayKey)=>(
                <tr key={"monthly-day-tr"+dayKey}>
              {weekDays?.map((itm,key)=>{
                let isFindBooked=false;
                if(monthDays[(dayKey*7)+key]){
                  isFindBooked=bookedRooms.find(book => {
                    const date1 = moment(monthDays[(dayKey*7)+key]);
                    const date2 = moment(book.startDate);
                    const date3 = moment(book.endDate);
            
                    if ((date1.isSame(date2, 'day')||date1.isSame(date3, 'day'))) {
                      return true;
                    }
                  })
                }
               
             return <td onClick={()=>{
              if(isFindBooked){
                setCalendarType("Daily")
                setWeekDays([new Date(monthDays[(dayKey*7)+key])])
              }
             }} key={"monthly_record"+key} className={`border border-slate-300 px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-500 ${isFindBooked?'bg-gray-400 text-white cursor-pointer':''}`}>
               {monthDays[(dayKey*7)+key]?moment(monthDays[(dayKey*7)+key]).format("ddd,DD"):""}
             </td>
              })
            }
              </tr>
              ))
              
            }

          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomCalendar;






