import React, {useState} from 'react'
import putNotification from "./Notification"
import {useNavigate} from "react-router-dom"
import { useRecoilState } from 'recoil'
import { authState } from '../states/atoms'
import axios from 'axios'
import { config } from '../config'

const Registration = () => {
  const navigate = useNavigate()

  const[firstName, setFirstName]= useState(null)
  const[lastName, setLastName]= useState(null)
  const[email, setEmail]= useState(null)
  const[password, setPassword]= useState(null)

  const submit = async values => {
    try {
      const resp = await axios.post(`${config.backendUrl}/registration`,
        {
          firstName,
          lastName,
          email,
          password,
          role:"USER"
        }
      )

      if (resp.status === 200) {
        putNotification(resp.data)
        navigate('/login')
      }
    } catch (error) {
      putNotification("Error!", error.response?.data?.message)
    }
  }

  return (
    <form class="w-full max-w-lg mx-auto px-4">
        <h1 class="mt-10 mb-10 text-center text-2xl font-bold">Register</h1>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" defaultValue={firstName} onChange={e=>setFirstName(e.target.value)} type="text" placeholder="First Name"/>
            </div>
            <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" defaultValue={lastName} onChange={e=>setLastName(e.target.value)} type="text" placeholder="Last Name"/>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="username">
                Username
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="username" defaultValue={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Username"/>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Password
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" defaultValue={password} onChange={e=> setPassword(e.target.value)} type="password" placeholder="***************"/>
            </div>
        </div>

        <div class="my-8 text-center">
            <button onClick={submit} class="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Register
            </button>
        </div>
    </form>
  )
}

export default Registration