"use client";
import React, { useState, useEffect } from 'react';
import tokenStorage from "../services/tokenStorage";
import { usePathname } from 'next/navigation'
import { setAxiosAuthorizationHeader } from "../services/axiosConfig";

export default function CheckIsAuth() {
    const pathname = usePathname()
    useEffect(() => {
        const token=tokenStorage.getToken();
        if (token){
        setAxiosAuthorizationHeader(token);
        }
       
    }, [pathname])
   
   
    return (
        <>
        </>
    );
}