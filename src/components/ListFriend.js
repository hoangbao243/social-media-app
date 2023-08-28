import Header from "./Header";
import React from 'react'

export default function ListFriend() {
  return (
    <div>
        <Header />
        <div className='relative w-9/12 my-10 rounded-[18px]  mx-auto'>
            <div className='flex w-full bg-sky h-[196px] rounded-t-[16px]'>
                <p className='text-[blue] mt-36 ml-64 font-bold text-[32px]'>Hoang Bao</p>
            </div>
            <div className='w-full bg-red-200 h-[112px] rounded-b-[16px]'></div>
            <div className='absolute top-24 left-14 rounded-[180px] w-44 h-44 bg-white'>
                <img className='' src=''></img>
            </div>
        </div>
        <div className='w-6/12 my-4 bg-red-200 h-[200px] mx-auto'>
          <h1>My post</h1>
        </div>
    </div>
  )
}
