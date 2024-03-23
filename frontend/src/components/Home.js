import React from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
// import Feed from './Feed'
import { Outlet } from 'react-router-dom';
import useOtherUsers from '../hooks/userOtherUsers';
import { useSelector } from 'react-redux';
import useGetMyTweets from '../hooks/useGetMyTweets';

const Home = () => {
  const { user, otherUsers } = useSelector(store => store.user);
  useOtherUsers(user?._id);
  useGetMyTweets();

  return (
    <div className='flex justify-between w-[85%] mx-auto'>
      <LeftSidebar/>
      <Outlet/>
      <RightSidebar otherUsers={otherUsers}/>
    </div>
  )
}

export default Home
