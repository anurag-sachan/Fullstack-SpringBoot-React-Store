import React, { useState } from 'react'
import { authState, searchState } from '../states/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import putNotification from './Notification'

const Navbar = () => {

    const [isOpen, setOpen]=useState(false)

    const [auth, setAuth] = useRecoilState(authState)
    const [search, setSearch] = useRecoilState(searchState)
    const signout= async() =>{
        // localStorage.removeItem("token")
        localStorage.clear()
        setAuth(false)
        putNotification("Successful","You've been logged out successfully !")
    }
    return (
        <nav class={`flex relative sticky top-0 items-center justify-between flex-wrap bg-white py-4 lg:px-40 md:px-20 px-10 ${!isOpen?'border-b border-gray-300 shadow-lg':null}`}>
            <div class="flex items-center flex-shrink-0 text-white mr-6">
            
            <a className='flex'>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-6 text-blue-500 sm:h-9">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg> */}
            {/* absolute top-0 right-0 mr-9 mt-5 */}
            <div class="mr-5 -my-1 lg:hidden md:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-gray-600 border-gray-300 hover:border-gray-500" onClick={()=>setOpen(!isOpen)}>
                {isOpen?
                <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#000000"/></svg> :
                <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g id="Menu / Menu_Alt_01"><path id="Vector" d="M12 17H19M5 12H19M5 7H19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                }
            </button>
            
            </div>
            <a href='/'><span class="self-center whitespace-nowrap font-semibold text-blue-500 tracking-tight py-2">💎 silk<b>ROAD.</b></span></a>
            </a>
            
            </div>
            <div class="w-full block lg:flex-grow md:flex md:items-center md:w-auto">
                <div class="text-sm lg:flex-grow">
                {/* {auth ? 
                <a href="/user" class="inline-block text-sm font-semibold px-4 py-2 leading-none border rounded-full text-gray-700 border-white bg-gray-200 hover:border-gray-500 mt-4 lg:mt-0 mr-4">👤 User</a> : null } */}
                </div>
                {/* <div>
                <input className="form-control mr-4 text-sm bg-gray-200 px-2 py-2 border rounded hover:border-gray-500" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearch(e.target.value)} />
                </div> */}
                <div>
                <div className={`pt-2 md:pt-0 md:flex md:items-center md:pb-0 pb-4 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${isOpen ? 'top-[58px] border-b border-gray-300 shadow-lg' : 'top-[-490px]'}`}>
                {/* <div className='flex self-center items-center'> */}
                    {!auth ?
                    <div>
                        <a href="/login" class="inline-block text-sm font-semibold px-4 py-2 leading-none border rounded text-white bg-blue-500 hover:text-blue-500 hover:bg-white hover:border hover:border-blue-500 mr-2">Login</a>
                        <a href="/registration" class="inline-block text-sm font-semibold px-4 py-2 leading-none border rounded text-white bg-rose-500 hover:text-red-500 hover:bg-white hover:border hover:border-rose-500 mr-4">Register</a>
                    </div> :
                    <a onClick={signout} class="hover:cursor-pointer inline-block text-sm font-semibold px-4 py-2 leading-none border rounded text-white bg-rose-500 hover:text-red-500 hover:bg-white hover:border hover:border-rose-500 mr-2">Sign Out</a>
                    }
                    <a href="/cart" class="inline-block text-sm font-semibold px-4 py-2 leading-none border rounded text-white border-white bg-gray-200 hover:border-gray-500 mt-4 md:my-0">🛒</a>
                </div>
                </div>
            </div>
        </nav>
    //     <nav class="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4">
    // <div class="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
        // <a href="#" class="flex items-center">
        // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-3 h-6 text-blue-500 sm:h-9">
        //     <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        // </svg>

    //     <span class="self-center whitespace-nowrap text-xl font-semibold">silkRoad</span>
    //     </a>
    //     <div class="mt-2 sm:mt-0 sm:flex md:order-2">
    //     {/* <!-- Login Button --> */}
    //     <button type="button" class="rounde mr-3 hidden border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg">Login</button>
    //     <button type="button" class="rounde mr-3 hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg">Register</button>
    //     {/* <!-- Register Button --> */}
    //     <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden" aria-controls="navbar-sticky" aria-expanded="false">
    //         <span class="sr-only">Open main menu</span>
    //         <svg class="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    //     </button>
    //     </div>
    //     <div class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto" id="navbar-sticky">
    //     <ul class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
    //         <li>
    //         <a href="#" class="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700" aria-current="page">Home</a>
    //         </li>
    //         <li>
    //         <a href="#" class="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700">You</a>
    //         </li>
    //         <li>
    //         <a href="#" class="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700">Orders</a>
    //         </li>
    //     </ul>
    //     </div>
    // </div>
    // </nav>
    )
}

export default Navbar