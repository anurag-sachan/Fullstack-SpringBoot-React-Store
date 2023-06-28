import React, {useEffect, useState} from 'react'
import {Input} from "antd"
import axios from "axios"
import putNotification from "./Notification"
import { useNavigate } from 'react-router-dom'
import { authState, searchState } from '../states/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'

const Store = () => {
    const [auth, setAuth] = useRecoilState(authState)

    localStorage.token!=null ? setAuth(true):setAuth(false) 

    const[img, setImg]=useState(null);
    const[name, setName]=useState(null);
    const[brand, setBrand]=useState(null);
    const[quantity, setQuantity]= useState(1);
    const[price, setPrice]=useState(null);

    const increment=()=>{
        setQuantity(quantity+1)
    }

    const decrement=()=>{
        if(quantity>1){
            setQuantity(quantity-1)
        }else return
    } 

    var token=localStorage.token;
    const addProduct= async()=> {
        try{
            const resp=await axios.post("https://localhost:8080/products",
            {
                img,
                name,
                brand,
                quantity,
                price
            },{
                headers: {
                    'Authorization': `Bearer ${token}` 
                }}
            )
            if (resp.status===200){
                putNotification("Adding new Product", resp.data)
            }
        }
        catch (error) {
            putNotification("Only admin can add products !", error.response?.data?.message)
          }
    }
    
    const [products, setProducts] = useState([])
    const getProducts= async() =>{
        try{
            const resp = await axios.get("https://localhost:8080/products/all")
            if (resp.status === 200) {
                setProducts(resp.data);
            }
        }catch{
            putNotification("Error", "Failed to fetch Data !")
        }
    }
    useEffect(() => {
        getProducts();
    }, [])

    const addToCart=async(product)=>{
        // console.log(product.id,product.img,product.name,product.brand,product.price)
        try{
            const resp= await axios.post("https://localhost:8080/cart",
                product
            )
            if (resp.status===200){
                putNotification("Added to Cart", resp.data)
            }
        }catch{
            putNotification("Error", "Failed to add to Cart!")
        }
    }

    // const [email, setEmail] = useState("")
    // const send = async () => {
    //     try {
    //         putNotification("Subscribing...")
    //         const resp = await axios.post("https://localhost:8080/newsletter", {email:email})

    //         if (resp.status===200){
    //         putNotification(resp.data)
    //         setEmail("")
    //         }
    //     } catch (error) {
    //         putNotification("Error!", error.response?.data?.message)
    //     }
    // }

  return (

    <body class="bg-gray-100">

    <h1 class="pt-10 pb-2 text-center text-2xl text-gray-800 font-bold">All Products</h1>

    <section class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 p-8">

    {auth?
    <article class="h-fit rounded-xl bg-white p-3 m-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
    <a href="#">
        <div class="relative flex items-end overflow-hidden rounded-xl">
        {/* <img src={img} onChange={e=>setImg(e.target.value)} alt="img-url" /> */}
        <input className='text-sm border hover:border-gray-500 rounded bg-gray-200 p-1 w-2/3 ml-6' type='text' placeholder='IMG_URL' defaultValue={img} onChange={e=>setImg(e.target.value)}/>
        </div>

        <div class="mt-1 p-2">
        {/* <h2 class="text-slate-700" onChange={e=>setName(e.target.value)}>{name}</h2> */}
        <input className='text-sm border hover:border-gray-500 rounded bg-gray-200 p-1 w-2/3 ml-4 mb-3' type='text' placeholder='NAME' defaultValue={name} onChange={e=>setName(e.target.value)}/>

        {/* <p class="mt-1 text-sm text-slate-400" onChange={e=>setBrand(e.target.value)}>{brand}</p> */}
        <input className='text-sm border hover:border-gray-500 rounded bg-gray-200 p-1 w-2/3 ml-4' type='text' placeholder='BRAND' defaultValue={brand} onChange={e=>setBrand(e.target.value)}/>
        <div class="mt-3 flex items-end justify-between">
            {/* <p class="text-lg font-bold text-blue-500" onChange={e=>setPrice(e.target.value)}>${price}</p> */}
            <input className='text-sm border hover:border-gray-500 rounded bg-gray-200 p-1 w-1/3 ml-4' type='text' placeholder='PRICE' defaultValue={price} onChange={e=>setPrice(e.target.value)}/>

            <div class="flex items-center space-x-1.5 rounded-lg bg-rose-500 px-4 py-1.5 text-white duration-100 hover:bg-rose-600">
            <button class="text-sm" onClick={addProduct}>+ addProduct</button>
            </div>
        </div>
        </div>
    </a>
    </article>

    :null}

    {
        products.map((product)=>(
        <article class="h-fit rounded-xl bg-white p-3 m-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <a href="#">
            <div class="relative flex items-end overflow-hidden rounded-xl">
            <img src={product.img} alt="New Product" />
            </div>

            <div class="mt-1 p-2">
            <h2 class="text-slate-700">{product.name}</h2>
            <p class="mt-1 text-sm text-slate-400">{product.brand}</p>

            <div class="mt-3 flex items-end justify-between">
                <p class="text-lg font-bold text-blue-500">${product.price}</p>

                <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600 ml-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>

                <button onClick={()=>addToCart(product)} class="text-sm">Add to cart</button>
                </div>
            </div>
            </div>
        </a>
        </article>
        ))
    }
    {/* <Cart
        id
        url
        name
        price
    /> */}
    </section>
    {/* <div>
        <h1 class="mt-8 mb-4 text-center text-2xl text-gray-800 font-bold">Subscribe to our Newsletter</h1>
        <Input placeholder="email" value={email} type="your email" size="large" style={{marginLeft:"35%", width:"30%"}} onChange={(e) => setEmail(e.target.value)} onPressEnter={send}/>
        <h6 class="m-4 text-center text-sm text-gray-700">To get the best deals & stay updated...</h6>
    </div> */}
    <footer className='flex border-t border-gray-500 justify-between mb-0 p-1 text-gray-700 text-xs'>
        <div>&copy;2023. All rights reserved.</div>
        <div>Written & Maintained by Anurag Sachan.</div>
    </footer>
    </body>
  )
}

export default Store