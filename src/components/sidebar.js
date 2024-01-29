"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Menu } from '../utils/sideBarMenu'
import { usePathname } from 'next/navigation'

const menuListStyle = [
  'text-gray-500 hover:text-blue-500 text-sm'
]
const SideBar = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false)
  const router = useRouter();
const pathname = usePathname()

  // Function to handle the navigation to another page
  const navigateToSecondPage = (route) => {
    // Use the push function to navigate to the specified page
    if (route) {
      router.push(`${route}`);
      setIsOpenSideBar(false)
    }
  };
  const onLogout = () => {
    localStorage.clear()
    router.push(`login`);
  }

  return (
    <>

      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button onClick={() => {
                setIsOpenSideBar(!isOpenSideBar)
              }} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" className="h-12 me-3" alt="FlowBite Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Hotel System</span>
              </a>
            </div>
            <div className="flex items-center">
           
            </div>
          </div>
        </div>
      </nav>

      <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 ${isOpenSideBar ? "translate-x-0" : "sm:translate-x-0"} dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar`}>
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <span className='text-gray-600 p-3 text-sm'>MENU</span>
          <ul className="space-y-2 font-medium">
            {Menu.map((mnu, key) => (
              <li key={"sideBarMenu" + key}>
                <span
                  onClick={() => navigateToSecondPage(mnu?.route)}
                  className={`${'/'+mnu.route==pathname?'bg-gray-200 text-blue-500':''} cursor-pointer flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group ${menuListStyle}`}>
                  {mnu?.icon}
                  <span className={`ms-3`}>{mnu?.title}</span>
                </span>
              </li>
            ))}


          </ul>
        </div>
      </aside>

 {/* Backdrop */}
 {isOpenSideBar && (
        <div className="fixed inset-0 z-30 bg-black opacity-50">
        </div>
      )}

    </>
  )
}

export default SideBar;