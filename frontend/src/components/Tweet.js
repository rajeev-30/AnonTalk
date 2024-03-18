import React from 'react'
import Avatar from "react-avatar";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";

const Tweet = ({tweet}) => {
  return (
    <div>
        <div>
            <div className='flex p-4 border-b border-gray-200'>
                <Avatar googleId="118096717852922241760" size="40" round={true} />
                <div className='ml-2'>
                    <div className='flex items-center'>
                        <h1 className='font-bold'>Rajeev</h1>
                        <p className='text-slate-500 ml-1'>@rxjjjeev.k . 13h</p>
                    </div> 
                    <div>
                        <p className='text-justify'> {tweet?.description}
                        </p>
                    </div>
                    <div className='mt-4 flex justify-between'>
                        <div className='flex items-center hover:text-[#F535AA] hover:cursor-pointer'>
                                <div className='hover:bg-red-50 hover:text-rose-600  rounded-full p-2'>
                                    <FaRegHeart/>
                                </div>
                                <p className=''>0</p>
                        </div>
                        <div className='flex items-center hover:text-[#39FF14] hover:cursor-pointer'>
                                <div className='hover:bg-green-50  rounded-full p-2'>
                                    <FaRegComment/>
                                </div>
                                <p className=''>0</p>
                        </div>
                        <div className='flex items-center hover:text-[#4D4DFF] hover:cursor-pointer'>
                                <div className='hover:bg-blue-50  rounded-full p-2'>
                                    <FaRegBookmark/>
                                </div>
                                <p className=''>0</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tweet