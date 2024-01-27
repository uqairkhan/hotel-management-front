"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import SideBar from "@/components/sidebar";
import tokenStorage from "../services/tokenStorage";

export default function isAuth(Component) {
  return function IsAuth(props) {
    const auth =tokenStorage.getToken()


    useEffect(() => {
      if (!auth) {
        return redirect("/login");
      }
    }, []);


    if (!auth) {
      return null;
    }

    return <>
    <SideBar/>
    <div style={{margin:"85px 16px 5px 270px"}}>
             <Component {...props} />
        </div>
   
    </>;
  };
}