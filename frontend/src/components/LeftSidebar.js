import React from 'react'
import { MdOutlineHome } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux';

const LeftSidebar = () => {
  const {user} = useSelector(store=>store.user);
  return (
    <div className='w-[20%] mt-3'>
      <div>
        <div>
          <img width={"50px"} src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?w=1380&t=st=1710528191~exp=1710528791~hmac=3fbd0810e89d3bc771029903c81a6097e1c2caa2ee48c58b675dc437639cfc02" alt=''/>
        </div>

        <div className='my-3'> 
            <Link to={"/"} className='flex items-center pl-2 pr-4 py-3 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full w-fit'>
              <div>
                <MdOutlineHome size={"30px"}/>
              </div>
              <h1 className='mx-2 font-semibold text-xl'>Home</h1>
            </Link>
            <div className='flex items-center pl-2 pr-4 py-3 my-2  hover:bg-gray-200 hover:cursor-pointer rounded-full w-fit'>
              <div>
                <CiSearch size={"30px"}/>
              </div>
              <h1 className='mx-2 font-semibold text-xl'>Explore</h1>
            </div>
            <div className='flex items-center pl-2 pr-4 py-3 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full w-fit'>
              <div>
                <IoMdNotificationsOutline size={"30px"}/>
              </div>
              <h1 className='mx-2 font-semibold text-xl'>Notifications</h1>
            </div>
            <div className='flex items-center pl-2 pr-4 py-3 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full w-fit'>
              <div>
                <FiMessageSquare size={"30px"}/>
              </div>
              <h1 className='mx-2 font-semibold text-xl'>Message</h1>
            </div>
            <Link to={`/profile/${user?._id}`} className='flex items-center pl-2 pr-4 py-3 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full w-fit'>
              <div>
                <CgProfile size={"30px"}/>
              </div>
              <h1 className='mx-2 font-semibold text-xl'>Profile</h1>
            </Link>
            <div className='flex items-center pl-2 pr-4 py-3 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full w-fit'>
              <div>
                <IoLogOut size={"30px"}/>
              </div>
              <h1 className='mx-2 font-semibold text-xl'>Logout</h1>
            </div>
            <button className='px-10 py-3 my-2 border-none text-xl font-bold bg-[#1D9BF0] w-full text-white hover:cursor-pointer rounded-full '>Post</button>
        </div>

      </div>
    </div>
  )
}

export default LeftSidebar