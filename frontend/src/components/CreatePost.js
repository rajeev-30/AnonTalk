import React from 'react'
import Avatar from "react-avatar";
import { IoImageOutline } from "react-icons/io5";
import  {useState}  from 'react';
import axios from "axios";
import {TWEET_API_END_POINT} from "../utils/constant";
import {USER_API_END_POINT} from "../utils/constant";
import toast from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux';
import { getAllTweets, getIsActive, getRefresh } from '../redux/tweetSlice';
// import {tweetCounthandler} from './Tweet'

export const CreatePost = () => {
    const [description, setDescription] = useState("");
    const {user} = useSelector(store=>store.user);
    const {tweet} = useSelector(store=>store.tweet);
    const {isActive} = useSelector(store=>store.tweet);
    const dispatch = useDispatch();


    const submitHandler = async () =>{
        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/create`,{description, id:user?._id},{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true,
            });
            const res1 = await axios.put(`${USER_API_END_POINT}/tweetcount/${tweet[0]?._id}`,{id: user?._id },{
                withCredentials: true,
            })

            dispatch(getRefresh());
            if(res.data.status){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log('error: ', error )
        }
        setDescription("");
    }
    

    const forYouHandler = () => {
        dispatch(getIsActive(true));
    }
    const followingHandler = () => {
        dispatch(getIsActive(false));
    }

  return (
    <div className='w-[100%]'>
          <div className=''>
              
              <div className='flex items-center justify-evenly border-b border-gray-200'>
                <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center p-4`}>
                    <h1 className='font-semibold text-2xl'>For you</h1>
                </div>
                <div onClick={followingHandler} className={`${isActive ? "border-b-4 border-transparent" : " border-b-4 border-blue-600"} cursor-pointer hover:bg-gray-200 w-full text-center p-4`} >
                    <h1 className='font-semibold text-2xl'>Following</h1>
                </div>
            </div>

            <div className='flex relative'>
                <div className='m-4'>
                    <Avatar googleId="118096717852922241760" size="40" round={true} />
                </div>
                    <input value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full outline-none border-none pr-5 text-xl font-medium bg-transparent' type='text' placeholder='Write fearlessy...'/>
            </div>
            <div className='flex justify-between mx-16 mt-12 mb-4'>
                <IoImageOutline size={"20px"}/>
                <button onClick={submitHandler} className='bg-[#1D9BF0] px-4 py-1 text-lg text-white font-semibold border-none rounded-full'>post</button>
            </div>
                            {/* Border  Bottom*/}
            <div className='border-b border-gray-2'></div>
        </div>
    </div>
  )
}
