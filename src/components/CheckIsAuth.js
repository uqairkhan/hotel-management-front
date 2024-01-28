"use client";
import React, { useState, useEffect } from 'react';
import tokenStorage from "../services/tokenStorage";
import SideBar from '../components/sidebar';
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { setAxiosAuthorizationHeader } from "../services/axiosConfig";
import Login from '@/app/login/page';
export default function CheckIsAuth({children}) {
    const router = useRouter();
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        const token=tokenStorage.getToken();
        if (token){
        setAxiosAuthorizationHeader(token);
            setIsAuthenticated(true)
        }
        else {
            setIsAuthenticated(false)
            router.push("login")
        }
       

    }, [pathname])
   
   if(!isAuthenticated){
    return <Login/>
   }
   else return (
        <>
         <SideBar/>
         <div>
         {children}
         </div>
            
        </>
    );
}