import React from 'react'
import Avatar from 'react-avatar';
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom"
import UseGetProfile from '../hooks/useGetProfile';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, profile } = useSelector(store => store.user);
    const { id } = useParams();
    UseGetProfile(id);

    const followAndUnFollowingHandler = async() => {
        //UNFollow
        if (user.following.includes(id)) {
            try {
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, { id:user?._id }, {
                    withCredentials: true,
                })
                console.log(res);
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        } else {
            //Follow
            try {
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { id: user?._id }, {
                    withCredentials: true,
                })
                console.log(res);
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
    }
    return (
        <div className='w-[55%] mx-5 border border-gray-200'>
            <div className=''>
                <div className='ml-3 flex gap-6 items-center'>
                    <Link to="/" className='hover:bg-gray-200 hover:cursor-pointer rounded-full p-2'>
                        <IoArrowBackSharp size={"20px"} />
                    </Link>
                    <div>
                        <h1 className='font-bold text-xl'>{profile?.name}</h1>
                        <p className='text-sm text-gray-500'>{`${user.tweetCount.length} tweets`}</p>
                    </div>
                </div>
                <img src='https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1500x500' alt='banner' />
                <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
                    <Avatar googleId="118096717852922241760" size="120" round={true} />
                </div>
                <div className='text-right m-4'>
                    {
                        user?._id===profile?._id ? (<>
                            <button className='px-4 py-2 bg-black text-white font-bold rounded-full'>Edit profile</button>
                        </>) : (
                            <button onClick={followAndUnFollowingHandler} className='px-4 py-2 bg-black text-white font-bold rounded-full'>{user.following.includes(id)? "Following" :"Follow"}</button>
                        )
                    }
                </div>
                <div className='mt-10 ml-4'>
                    <p className='font-bold text-2xl'>{profile?.name}</p>
                    <p className='text-gray-500 text-m'>{`@${profile?.username}`}</p>
                </div>
                <div className='m-4 text-m'>
                    <p>In the Rohit Era, Mumbai Indians used to dominate all the teams and win the trophy so easily. Now in the Chapri Era.</p>
                </div>
            </div>
        </div>
    )
}

export default Profile