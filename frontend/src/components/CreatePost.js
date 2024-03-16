import React from 'react'
import Avatar from "react-avatar";
import { IoImageOutline } from "react-icons/io5";

export const CreatePost = () => {
  return (
    <div className='w-[100%]'>
        <div className=''>
            <div className='flex items-center justify-evenly border-b border-gray-200'>
                <div className='cursor-pointer hover:bg-gray-200 w-full text-center p-4'>
                    <h1 className='font-semibold text-2xl'>For you</h1>
                </div>
                <div className='cursor-pointer hover:bg-gray-200 w-full text-center p-4' >
                    <h1 className='font-semibold text-2xl'>Following</h1>
                </div>
            </div>

            <div className='flex'>
                <div className='m-4'>
                    <Avatar googleId="118096717852922241760" size="40" round={true} />
                </div>
                    <input className='w-full outline-none border-none pr-5 text-xl font-medium bg-transparent' type='text' placeholder='Write fearlessy...'/>
            </div>
            <div className='flex justify-between mx-16 mt-12 mb-4'>
                <IoImageOutline size={"20px"}/>
                <button className='bg-[#1D9BF0] px-4 py-1 text-lg text-white font-semibold border-none rounded-full'>post</button>
            </div>
                            {/* Border  Bottom*/}
            <div className='border-b border-gray-2'></div>
        </div>
    </div>
  )
}
