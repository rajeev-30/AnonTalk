import React, { useState } from 'react'
import { MdOutlineHome } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getMyProfile, getOtherUsers, getUser, } from '../redux/userSlice';
import {getRefresh } from '../redux/tweetSlice';
import logo from '../images/logo.png'
import { RiLogoutBoxFill } from "react-icons/ri";

const LeftSidebar = () => {
  const [description, setDescription] = useState("");
  const { user } = useSelector(store => store.user);
  const navigat = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(user);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`)
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      navigat('/login');
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler = async () => {
    try {
      const res = await axios.post(`${TWEET_API_END_POINT}/create`, { description, id: user?._id }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      dispatch(getRefresh());
      if (res.data.status) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log('error: ', error)
    }
    setDescription("");
  }

  return (
    <div className='w-[20%] mt-3	'>
      <div className='fixed' >
        <div>
          <img width={"60px"} src={logo} alt='' />
        </div>

        <div className='my-3'>
          <Link to={"/"} className='flex items-center pl-2 pr-4 py-3 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full w-fit'>
            <div>
              <MdOutlineHome size={"30px"} />
            </div>
            <h1 className='mx-2 font-semibold text-xl'>Home</h1>
          </Link>
          <div className='flex items-center pl-2 pr-4 py-3 my-2  hover:bg-gray-200 hover:cursor-pointer rounded-full w-fit'>
            <div>
              <CiSearch size={"30px"} />
            </div>
            <h1 className='mx-2 font-semibold text-xl'>Explore</h1>
          </div>
          <div className='flex items-center pl-2 pr-4 py-3 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full w-fit'>
            <div>
              <IoMdNotificationsOutline size={"30px"} />
            </div>
            <h1 className='mx-2 font-semibold text-xl'>Notifications</h1>
          </div>
          <div className='flex items-center pl-2 pr-4 py-3 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full w-fit'>
            <div>
              <FiMessageSquare size={"30px"} />
            </div>
            <h1 className='mx-2 font-semibold text-xl'>Message</h1>
          </div>
          <Link to={`/profile/${user?._id}`} className='flex items-center pl-2 pr-4 py-3 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full w-fit'>
            <div>
              <CgProfile size={"30px"} />
            </div>
            <h1 className='mx-2 font-semibold text-xl'>Profile</h1>
          </Link>
          {
            !isLogin && (<>
              <Link to={'/login'}>
                <div className='flex items-center pl-2 pr-4 py-3 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full w-fit'>
                  <div>
                    <IoLogOut size={"30px"} />
                  </div>
                  <h1 className='mx-2 font-semibold text-xl'>Login</h1>
                </div>
              </Link>
            </>)
          }
          {
            isLogin && (<>
              <div onClick={logoutHandler} className='flex items-center pl-2 pr-4 py-3 my-2 hover:bg-gray-200 hover:cursor-pointer rounded-full w-fit'>
                <div>
                  <RiLogoutBoxFill size={"30px"} />
                </div>
                <h1 className='mx-2 font-semibold text-xl'>Logout</h1>
              </div>
            </>)
          }
          <button onClick={submitHandler} className='px-10 py-3 my-2 border-none text-xl font-bold bg-black w-full text-white hover:cursor-pointer rounded-full '>Post</button>
        </div>

      </div>
    </div>
  )
}

export default LeftSidebar