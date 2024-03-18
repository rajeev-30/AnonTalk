import React from 'react'
import { CreatePost } from './CreatePost'
import Tweet from './Tweet'
import {useSelector} from 'react-redux';

const Feed = () => {
  const {tweets} = useSelector(store=>store.tweet);

  return (
    <div className='w-[55%] mx-5 border border-gray-2' >
      <CreatePost/>
      {
        tweets?.map((tweet)=> <Tweet key={tweet?._id} tweet={tweet}/>)
      }
     <Tweet/>
    </div>
  )
}

export default Feed