import React, { useEffect, useState } from 'react'
import axios from "axios"
import putNotification from "./Notification"
import { useNavigate } from 'react-router-dom'
import { authState, searchState } from '../states/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'

const Cart = () => {

    const [auth, setAuth] = useRecoilState(authState)

    const[quantity, setQuantity]= useState(1)

    // const decrement=()=>{
    //     setQuantity(quantity-1)
    // }

    // const increment=()=>{
    //     setQuantity(quantity+1)
    // }

    const [cartProducts, setCartProducts] = useState([])
    const getCartProducts= async()=>{
        try{
            const resp = await axios.get("https://localhost:8080/cart")
            if (resp.status === 200) {
                setCartProducts(resp.data);
            }
        }catch{
            putNotification("Error", "Failed to fetch Data !")
        }
    }
    useEffect(() => {
        getCartProducts();
    }, [])

    // const updateQuantity = (index, newQuantity) => {
    //     setCartProducts((prevItems) => {
    //       const updatedItems = [...prevItems];
    //       updatedItems[index].quantity = newQuantity;
    //       return updatedItems;
    //     });
    //   };

    var subTotal=0
    for(let i=1; i<=cartProducts.length; i++){
        subTotal+=cartProducts[i-1].price;
    }
    var gstAmount=subTotal*0.125
    var totalAmt=subTotal+gstAmount

    const navigate= useNavigate()
    const handleCheckout=async()=>{
        try{
            const resp= await axios.delete("https://localhost:8080/cart")
            if(resp.status===200){
                setCartProducts([])
                putNotification("Order placed!","Go to Orders")
            }
        }catch{
            putNotification("Error", "Unable to Empty Cart")
        }
    }
    
    return (
    <body>
    <div class="bg-gray-200 pt-10">
    {/* bg-gradient-to-b from-white to-gray-500 */}
        <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div class="flex flex-col mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {
        // cartProducts.map((cartProduct, index)=>(
        cartProducts.map((cartProduct)=>(
        <div class="rounded-lg ml-6" style={{width:"65%"}}>
            <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={cartProduct.img} alt="" class="w-full rounded-lg sm:w-40" style={{height:"8rem", width:"15rem"}} />
            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div class="mt-5 sm:mt-0">
                <h2 class="text-lg font-bold text-gray-900">{cartProduct.name}</h2>
                <p class="mt-1 text-sm text-gray-700">{cartProduct.brand}</p>
                </div>
                <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div class="flex items-center">
                    <div class="text-sm text-gray-700 font-bold mr-4"> Quantity :</div>
                    {/* <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={decrement} > - </span> */}
                    <div class="bg-white border px-3 py-1 text-center text-sm outline-none" >{quantity}</div>
                    {/* <span class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={increment}> + </span> */}
                </div>
                <div class="flex items-center space-x-4">
                    <p class="text-sm">$ {cartProduct.price * quantity}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                </div>
            </div>
            </div>
        </div>
        ))}
        {/* Sub total */}
        <div>
        <div class="my-8 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div class="mb-2 flex justify-between">
            <p class="text-gray-700">Subtotal</p>
            <p class="text-gray-700">$ {subTotal.toFixed(2)}</p>
            </div>
            <div class="flex justify-between">
            <p class="text-gray-700 text-sm font-bold text-gray-500">GST - 12.5%</p>
            <p class="text-gray-700">$ {gstAmount.toFixed(2)}</p>
            </div>
            <hr class="my-4" />
            <div class="flex justify-between">
            <p class="text-lg font-bold">Total</p>
            <div class="">
                <p class="mb-1 ml-2 text-lg font-bold">$ {totalAmt.toFixed(2)}</p>
                <p class="text-sm text-gray-700">including GST</p>
            </div>
            </div>
            {!cartProducts.length==0 ?
            <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={handleCheckout}>Check out</button>
            :
            <button class="mt-6 w-full rounded-md bg-rose-500 py-1.5 font-medium text-red-50 hover:bg-rose-600" onClick={()=>navigate('/#responsive-header')}>Integrate Payment Portal</button>
            }
        </div>
        </div>
        </div>
    </div>
    </body>
    )
}

export default Cart