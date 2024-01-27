"use client";
import React, { useState, useEffect } from 'react';
import CustomTable from '../../components/customTable';
import DropDown from "../../components/dropdown";
import Input from '../../components/input';
import Loader from '../../components/loader';
import { allStaff } from '../../services/api';
import isAuth from '@/HOC/isAuth';

const Staff = () => {

    const [staffList, setStaffList] = useState([])
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        onFetchStaff()
    }, [])
    const onFetchStaff = async () => {
        try {
            setLoading(true)
            const res = await allStaff()
            setStaffList(res.data)
            setData(res.data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }
    const filterByPositionType = (position) => {
        let filterObj = []
        if (position) {
            filterObj = data.filter(itm =>
                itm?.position.toLowerCase().startsWith(position.toLowerCase()))
            setStaffList(filterObj)
        } else {
            setStaffList(data)
        }

    }
    const filterByName = (name) => {
        let filterObj = []
        if (name) {
            filterObj = data.filter(itm =>
                itm?.name.toLowerCase().startsWith(name.toLowerCase()))
            setStaffList(filterObj)
        } else {
            setStaffList(data)
        }

    }
    return (
        <>
            {loading && <Loader />}
            <div className='flex justify-between flex-wrap gap-y-3 gap-x-3 mb-2'>
                <span className='text-lg font-medium'>Staff list</span>
                <span className='text-sm font-small'><span className='text-green-500'>{data.length}</span> All Staff</span>
                <div className='flex justify-between gap-y-2 gap-x-2 mb-2'>
                    <DropDown
                        padding={"p-2"}
                        onChange={(option) => filterByPositionType(option)}
                        placeHolder="All position"
                        options={[
                            "All position",
                            "Front Desk Manager",
                            "Housekeeping Supervisor",
                            "Chef",
                            "Concierge",
                            "Security Guard"
                        ]}
                    />
                    <Input
                        marginBottom="mb-1"
                        padding="p-2"
                        inputProps={{
                            name: "name",
                            type: "text",
                            placeHolder: "Search",
                            required: true,
                            onChange: (e) => filterByName(e.target.value)

                        }} />
                </div>
            </div>
            <CustomTable
                rows={[
                    { name: "name", label: "name" },
                    { name: "position", label: "position" },
                    { name: "contact", label: "contact" },
                    { name: "email", label: "email" },
                    { name: "responsibility", label: "responsibility" },
                    { name: "emergencyContact", label: "emergency Contact" },
                    { name: "nationality", label: "nationality" },


                ]}
                data={staffList}
            />

        </>
    )
}

export default isAuth(Staff);