import React, { useState } from 'react'
import { cartState, authState, searchState } from '../states/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import putNotification from './Notification'
import { config } from '../config'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Navbar = () => {
    const [isOpen, setOpen]=useState(false)
    const [auth, setAuth] = useRecoilState(authState)
    const [search, setSearch] = useRecoilState(searchState)
    const [cart, setCart] = useRecoilState(cartState);
    const navigate=useNavigate()
    const signout = async () => {
        if (auth && cart.length > 0) {
            try {
                const email = localStorage.getItem('email');
                const cartData = cart.map(item => ({
                    id: item.id,
                    img: item.img,
                    name: item.name,
                    brand: item.brand,
                    price: item.price,
                    quantity: item.quantity,
                    email: email
                }));

                const response = await axios.post(`${config.backendUrl}/cart`, cartData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });

                if (response.status === 200) {
                    putNotification("Cart Saved", "Your cart has been saved successfully.");
                }
            } catch (error) {
                putNotification("Error", "Failed to save cart data.");
            }
        }

        localStorage.clear();
        setAuth(false);
        setCart([]);
        navigate("/");
        putNotification("Successful", "You've been logged out successfully!");
    };
    const redirect= async(page) =>{
        navigate(`/${page}`);
    }
    return (
        <nav class={`flex fixed sticky items-center justify-between flex-wrap bg-white py-4 lg:px-40 md:px-20 px-10 ${!isOpen?'border-b border-gray-300 shadow-lg':null}`}>
            <div class="flex items-center flex-shrink-0 text-white mr-6">
            
            <a className='flex'>
            <div class="mr-5 -my-1 lg:hidden md:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-gray-600 border-gray-300 hover:border-gray-500" onClick={()=>setOpen(!isOpen)}>
                {isOpen?
                <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#000000"/></svg> :
                <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g id="Menu / Menu_Alt_01"><path id="Vector" d="M12 17H19M5 12H19M5 7H19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
                }
            </button>
            
            </div>
            <a onClick={()=>redirect('')}><span class="hover:cursor-pointer self-center whitespace-nowrap font-semibold text-blue-500 tracking-tight py-2">💎 silk<b>ROAD.</b></span></a>
            </a>
            
            </div>
            <div class="w-full block lg:flex-grow md:flex md:items-center md:w-auto">
                <div class="text-sm lg:flex-grow"></div>
                <div>
                <div className={`pt-2 md:pt-0 md:flex md:items-center md:pb-0 pb-4 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${isOpen ? 'top-[58px] border-b border-gray-300 shadow-lg' : 'top-[-490px]'}`}>
                    {!auth ?
                    <div>
                        <a onClick={()=>redirect('login')} class="hover:cursor-pointer inline-block text-sm font-semibold px-4 py-2 leading-none border rounded text-white bg-blue-500 hover:text-blue-500 hover:bg-white hover:border hover:border-blue-500 mr-2">Login</a>
                        <a onClick={()=>redirect('registration')} class="hover:cursor-pointer inline-block text-sm font-semibold px-4 py-2 leading-none border rounded text-white bg-rose-500 hover:text-red-500 hover:bg-white hover:border hover:border-rose-500 mr-4">Register</a>
                    </div> :
                    <a onClick={signout} class="hover:cursor-pointer inline-block text-sm font-semibold px-4 py-2 leading-none border rounded text-white bg-rose-500 hover:text-red-500 hover:bg-white hover:border hover:border-rose-500 mr-2">Sign Out</a>
                    }
                    {/* <a href="/cart" class="inline-block text-sm font-semibold px-4 py-2 leading-none border rounded text-white border-white bg-gray-200 hover:border-gray-500 mt-4 md:my-0">🛒</a> */}
                    <a onClick={()=>redirect('cart')} class="hover:cursor-pointer inline-block text-sm font-semibold px-4 py-2 leading-none border rounded text-white border-white bg-gray-200 hover:border-gray-500 mt-4 md:my-0">🛒</a>
                </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar