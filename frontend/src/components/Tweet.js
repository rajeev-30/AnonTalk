import React, { useState } from 'react'
import Avatar from "react-avatar";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { TWEET_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetSlice';
import { FaHeart } from "react-icons/fa6";



const Tweet = ({ tweet }) => {

    const { user } = useSelector(store => store.user);
    // const { tweet } = useSelector(store => store.tweet);
    const dispatch = useDispatch();
    const [likeButton, setLikeButton] = useState(tweet.like.includes(user._id));
    
   


    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true,
            })
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const deleteTweetHandler = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const likeButtonHandler = () => {
        setLikeButton(!likeButton);
    }

   
    
    return (
        <div>
            <div>
                <div className='flex p-4 border-b border-gray-200'>
                    <Avatar googleId="118096717852922241760" size="40" round={true} />
                    <div className='ml-2 w-full'>
                        <div className='flex items-center'>
                            <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                            <p className='text-slate-500 ml-1'>{`@${tweet?.userDetails[0]?.username}`}</p>
                        </div>
                        <div >
                            <p className='text-justify'> {tweet?.description}
                            </p>
                        </div>
                        <div className='mt-4 flex justify-between'>
                            <div onClick={likeButtonHandler} className='flex items-center hover:text-[#F535AA] hover:cursor-pointer'>
                                <div onClick={() => likeOrDislikeHandler(tweet?._id)} className='hover:bg-red-50 hover:text-rose-600  rounded-full p-2'>
                                    {
                                        !likeButton && (<>
                                                <FaRegHeart />
                                            </>)
                                    }
                                    {
                                        likeButton && (<>
                                            <FaHeart className='text-[#F535AA]' />
                                        </>)
                                    }
                                </div>
                                {
                                    !likeButton && (<>
                                        <p className=''>{tweet?.like.length}</p>
                                    </>)
                                }
                                {
                                    likeButton && (<>
                                        <p className='text-[#F535AA]'>{tweet?.like.length}</p>
                                    </>)
                                }
                               
                            </div>
                            <div className='flex items-center hover:text-[#39FF14] hover:cursor-pointer'>
                                <div className='hover:bg-green-50  rounded-full p-2'>
                                    <FaRegComment />
                                </div>
                                <p className=''>0</p>
                            </div>
                            <div className='flex items-center hover:text-[#4D4DFF] hover:cursor-pointer'>
                                <div className='hover:bg-blue-50  rounded-full p-2'>
                                    <FaRegBookmark />
                                </div>
                                <p className=''>0</p>
                            </div>
                            {
                                user?._id === tweet?.userId && (<>
                                    <div className='flex items-center hover:text-[#ff4d4d] hover:cursor-pointer' >
                                        <div onClick={() => deleteTweetHandler(tweet?._id)} className='hover:bg-blue-50  rounded-full p-2'>
                                            <MdDeleteOutline size={22} />
                                        </div>
                                    </div>
                                </>)
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Tweet