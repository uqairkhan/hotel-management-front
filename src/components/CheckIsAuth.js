"use client";
import React, { useState, useEffect } from 'react';
import tokenStorage from "../services/tokenStorage";
import SideBar from '../components/sidebar';
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { setAxiosAuthorizationHeader } from "../services/axiosConfig";

export default function CheckIsAuth() {
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
            router.push(`login`);
            setIsAuthenticated(false)
        }
       

    }, [pathname])
   
   
    return (
        <>
            {isAuthenticated && <SideBar />}
        </>
    );
}