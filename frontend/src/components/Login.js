import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { authState } from '../states/atoms'
import putNotification from './Notification'

const Login = () => {
    const navigate= useNavigate()
    const [auth, setAuth] = useRecoilState(authState)
    const[email, setEmail]=useState(null)
    const[password, setPassword]=useState(null)

    const logIn = async values => {
        try{
            const resp = await axios.post('https://localhost:8080/login',{
                email,
                password
                // email: values.usrname, //backend: values(fx).nameOfFormField
                // password: values.passwd
            })
            
            if(resp.status === 200){
                localStorage.setItem('email', email)
                localStorage.setItem('token', resp.data)
                putNotification('Successful', 'You have been successfully logged in!!')
                setAuth(true)
                navigate('/')
            }
        }catch(error){
            putNotification('Error!', error.response?.data?.message)
        }
    }

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
          };

  return (
    <div class="w-full max-w-xs mx-auto">
        <h1 class="mt-10 mb-10 text-center text-2xl font-bold">LogIn</h1>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username" name="usrname">
                Username
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" defaultValue={email} onChange={e=> setEmail(e.target.value)} />
            </div>
            <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password" name="passwd">
                Password
            </label>
            <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*********" defaultValue={password} onChange={e=> setPassword(e.target.value)} />
            <p class="text-red-500 text-xs italic">Please enter the password.</p>
            </div>
            <div class="flex items-center justify-between">
            <button onClick={logIn} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Sign In
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
            </a>
            </div>
            <div class='pt-4 text-sm'>Or <a href='/registration' className='text-blue-500'>Register Now!</a></div>
        </form>
        <p class="text-center text-gray-500 text-xs">
            &copy;2023. All rights reserved.
        </p>
    </div>
  )
}

export default Login