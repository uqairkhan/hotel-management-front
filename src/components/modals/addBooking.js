// src/components/Modal.jsx
import React, { useState } from 'react';
import Input from '../../components/input';
import DropDown from '../dropdown';
import Datetime from "react-datetime"
import { addNewBooking } from '../../services/api';
import { toast } from 'react-toastify';
import "react-datetime/css/react-datetime.css"
const gradientStyle = {
  background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
};
const Modal = ({ isOpen, onClose, title = "", onFetch }) => {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await addNewBooking(formData)
      setLoading(false)
      onClose()
      onFetch()
    } catch (err) {
      toast(err?.message, {type:"error"});
      setLoading(false)
    }
  }
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full max-w-md mx-auto my-6">
            {/* Modal content */}
            <div className="relative flex flex-col w-full bg-white border-2 border-gray-300 rounded-md shadow-lg">
              <div className="flex items-center justify-between p-5 border-b border-gray-300">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-5">
                <form onSubmit={handleSubmit}>

                  <div className='mb-1'>
                    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Arrival</label>
                    <Datetime
                      //value={this.state.startDate}
                      onChange={(dt) => setFormData({ ...formData, startDate: new Date(dt) })}
                      timeFormat={true}
                      closeOnSelect={true}
                      inputProps={{ placeholder: "Start Date" }}
                      className='custom_datePacker-class p-3 text-sm text-gray-900 border border-gray-300 rounded-lg'
                    />
                  </div>

                  <div className='mb-1'>
                    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Departure</label>
                    <Datetime
                      //value={this.state.startDate}
                      onChange={(dt) => setFormData({ ...formData, endDate: new Date(dt) })}
                      timeFormat={true}
                      closeOnSelect={true}
                      inputProps={{ placeholder: "Start Date" }}
                      className='custom_datePacker-class p-3 text-sm text-gray-900 border border-gray-300 rounded-lg'
                    />
                  </div>

                  <DropDown label='Room type'
                    onChange={(option) => setFormData({ ...formData, roomType: option })}
                    placeHolder="Please select"
                    required={true}
                    options={["Standard Room", "Deluxe Room", "Suite", "Family Room"]}
                  />
                  <DropDown label='N of people'
                    onChange={(option) => setFormData({ ...formData, noOfPeople: option })}
                    placeHolder="Please select"
                    required={true}
                    options={["1", "2", "3", "4"]}
                  />

                  <Input label="Full Name"
                    marginBottom="mb-1"
                    padding="p-3"
                    inputProps={{
                      name: "name",
                      type: "text",
                      placeHolder: "Name",
                      required: true,
                      onChange: handleInputChange

                    }} />
                  <Input label="Email"
                    marginBottom="mb-1"
                    padding="p-3"
                    inputProps={{
                      name: "email",
                      type: "email",
                      placeHolder: "Email",
                      required: true,
                      onChange: handleInputChange

                    }} />
                  <Input label="Document"
                    marginBottom="mb-1"
                    padding="p-3"
                    inputProps={{
                      name: 'document',
                      type: "number",
                      placeHolder: "Number",
                      required: true,
                      onChange: handleInputChange

                    }} />

                  <DropDown label='Payment type'
                    onChange={(option) => setFormData({ ...formData, paymentType: option })}
                    placeHolder="Please select"
                    required={true}
                    options={["Cash", "Credit Card", "Check"]}
                  />


                  <div className="pb-1 pt-1 text-center">
                    <button
                      className="inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                      type="submit"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      style={gradientStyle}>
                      Send
                    </button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black opacity-50">
        </div>
      )}
    </>
  );
};

export default Modal;
