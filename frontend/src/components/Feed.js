import React from 'react'
import { CreatePost } from './CreatePost.js'
import Tweet from './Tweet.js'
import {useSelector} from 'react-redux';

const Feed = () => {
  const {tweets} = useSelector(store=>store.tweet);

  return (
    <div className='w-[55%] h-[100%] mx-5 border border-gray-2' >
      <CreatePost/>
      {
        tweets?.slice().reverse().map((tweet)=> <Tweet key={tweet?._id} tweet={tweet}/>)
      }
     {/* <Tweet/> */}
    </div>
  )
}

export default Feed