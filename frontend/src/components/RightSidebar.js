import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";


const RightSidebar = () => {
  return (
    <div className='w-[30%] mt-3'>
      <div>
        <div className='flex items-center bg-gray-200 rounded-full'>
          <CiSearch size={"30px"} className='pl-2'/>
          <input className='outline-none bg-transparent p-3 w-full' type='text' placeholder='Search here...' />
        </div>
        <div className='bg-gray-200 rounded-lg my-4 p-4'>
          <h1 className='font-bold text-xl'>Weekly Top Creators</h1>
          <div className='flex items-center mt-4'>
            <Avatar googleId="118096717852922241760" size="40" round={true} />
            <div className='flex justify-between gap-1 w-full'>
              <div className='pl-2'>
                <p className='font-semibold'>Rajeev kumar</p>
                <p className='text-gray-500 text-sm'>@rxjjjeev.k</p>
              </div>
              <button className='bg-black px-3 text-md rounded-full text-white font-bold h-9 w-20'>Follow</button>
            </div>
          </div>
          <div className='flex items-center mt-4'>
            <Avatar googleId="118096717852922241760" size="40" round={true} />
            <div className='flex justify-between gap-1 w-full'>
              <div className='pl-2'>
                <p className='font-semibold'>Rajeev kumar</p>
                <p className='text-gray-500 text-sm'>@rxjjjeev.k</p>
              </div>
              <button className='bg-black px-3 text-md rounded-full text-white font-bold h-9 w-20'>Follow</button>
            </div>
          </div>
          <div className='flex items-center mt-4'>
            <Avatar googleId="118096717852922241760" size="40" round={true} />
            <div className='flex justify-between gap-1 w-full'>
              <div className='pl-2'>
                <p className='font-semibold'>Rajeev kumar</p>
                <p className='text-gray-500 text-sm'>@rxjjjeev.k</p>
              </div>
              <button className='bg-black px-3 text-md rounded-full text-white font-bold h-9 w-20'>Follow</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar