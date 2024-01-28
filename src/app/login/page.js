"use client";
import React, { useState,useEffect } from 'react';
import Input from '../../components/input';
import { userLogin } from '../../services/api';
import Loader from '../../components/loader';
import { setAxiosAuthorizationHeader } from "../../services/axiosConfig";
import { useRouter } from 'next/navigation'
import tokenStorage from "../../services/tokenStorage";
import { toast } from 'react-toastify'

const gradientStyle = {
    background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
};
export default function Login() {
const router = useRouter();
    const [isCheckedToken,setIsCheckedToken]=useState(false)
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        setIsCheckedToken(true)
     if(tokenStorage.getToken()){
     router.push(`dashboard`);
     }
    },[])
    if(!isCheckedToken)
    return null
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleLogin =async (e) => {
       try{
        e.preventDefault()
        setLoading(true)
        const res=await userLogin(formData)
        setAxiosAuthorizationHeader(res?.data?.token);
        const __set = JSON.stringify(res.data);
      localStorage.setItem('__set', __set);
      router.push(`dashboard`);
        setLoading(false)
       }catch(err){
        toast(err?.message, {type:"error"});
       setLoading(false)
       }
    }
    return (
        <>
        {loading&&<Loader/>}
            <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
                <div className="container h-full p-3 sm:p-5 md:p-6 lg:p-10 xl:p-12">
                    <div
                        className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                        <div className="w-full">
                            <div
                                className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                                <div className="g-0 lg:flex lg:flex-wrap">
                                    <div className="px-4 md:px-0 lg:w-6/12">
                                        <div className="md:mx-6 md:p-12">
                                            <div className="text-center">
                                                <img
                                                    className="mx-auto w-48"
                                                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                    alt="logo" />
                                                <h4 className="mb-10 mt-1 pb-1 text-xl font-semibold">
                                                    Hotel Management System
                                                </h4>
                                            </div>


                                            <form onSubmit={handleLogin}>
                                                <Input label="User Email" inputProps={{
                                                    placeHolder: "Enter User Email",
                                                    name:"email",
                                                    type:"email",
                                                    required: true,
                                                    onChange: handleInputChange

                                                }} />
                                                <Input label="Password" inputProps={{
                                                    type:"password",
                                                    placeHolder: "Enter User Password",
                                                    required: true,
                                                    name:"password",
                                                    onChange: handleInputChange

                                                }} />
                                                <div className="mb-12 pb-1 pt-1 text-center">
                                                    <button
                                                    disabled={loading}
                                                        className="mb-4 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                        type="submit"
                                                        data-te-ripple-init
                                                        data-te-ripple-color="light"
                                                        style={gradientStyle}>
                                                        Log in
                                                    </button>

                                                    <a href="#!">Forgot password?</a>
                                                </div>
                                            </form>



                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                        style={gradientStyle}
                                    >
                                        <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                            <h4 className="mb-6 text-xl font-semibold">
                                                We are more than just a company
                                            </h4>
                                            <p className="text-sm">
                                                A Hotel Management System (HMS) is a comprehensive software solution designed
                                                to streamline and automate the day-to-day operations of a hotel or hospitality
                                                establishment. It encompasses various modules to efficiently manage
                                                key aspects of hotel administration, guest services, and overall business processes.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
