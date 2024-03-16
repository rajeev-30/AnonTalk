import React from 'react'
import Avatar from "react-avatar";
import { IoImageOutline } from "react-icons/io5";

export const CreatePost = () => {
  return (
    <div className='w-[100%]'>
        <div className='flex items-center justify-between my-5 border-b border-gray-2px '>
            <div className='ml-5 mb-5'>
                <h1 className='font-bold text-2xl'>Home</h1>
            </div>
        </div>
        <div className='flex gap-5'>
            <div className='ml-6'>
                <Avatar googleId="118096717852922241760" size="35" round={true} />
            </div>
                <input className='w-full outline-none border-none pr-5 text-xl font-medium' type='text' placeholder='Write fearlessy...'/>
        </div>
        <div className='flex justify-between mx-20 mt-20 '>
            < IoImageOutline size={"20px"}/>
            <button className='bg-[#1D9BF0] px-4 py-1 text-lg text-white font-semibold border-none rounded-full'>post</button>
        </div>
        <div className='border-b border-gray-2 my-3'></div>

        {/* <div className='flex justify-between mx-5'>
            <div className='h-screen w-px bg-slate-500' ></div>
            <div className='h-screen w-px bg-slate-500' ></div>
        </div> */}

    </div>
  )
}
