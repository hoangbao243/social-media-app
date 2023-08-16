import React from 'react'
import { Link } from "react-router-dom";


export default function Login() {
  return (
    <div>
        <div className="w-full flex flex-row h-[76px] justify-center bg-white px-[140px]">
            <div className=" my-[18px]">
                <Link to={'/'} className="flex flex-row gap-3">
                <img className="w-[108px] h-[40px]" src="./images/Social.png"></img>
                <div className="flex flex-col w-10 h-10 bg-[#5D5FEF] rounded-[8px] justify-center px-1 py-1 mt-[1px]">
                    <img src="./images/net.png"></img>
                </div>
                </Link>
            </div>
        </div>
        <div className=' relative flex mx-36 bg-[#0C4195] h-[700px] w-10/12 mt-20 justify-end rounded-r-[22px]'>
            <h1 className='font-bold text-[32px] text-white mt-16 ml-12'>Good Vibes and good life. JoinToday.</h1>
            <img src='./images/Abstraction.png' className='absolute top-[200px] left-0'></img>
            <div className='w-8/12 h-[700px] bg-white rounded-[22px]'>
                <h1 className='font-normal text-[36px] w-32 h-11 mx-auto mt-[30px] mb-[100px]'>Sign in</h1>
                <form class="relative ml-56">
                    <input type="text" class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" placeholder='Username'></input>
                    <input type="text" class="w-8/12 p-4 border-b-2 border-gray-300 focus:border-blue-500 outline-none mb-4" placeholder='Password'></input>
                    <button className='h-[70px] w-6/12 text-white bg-[#0C4195] rounded-[9px] mx-16 mt-8'>Log in</button>
                </form>
                <div className='mt-4 flex flex-row gap-2 ml-56'>
                    <p>Don’t have an account? </p>
                    <Link className='text-[blue]' to={'/register'}>
                        Get one here.
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
