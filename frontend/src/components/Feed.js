import React from 'react'
import { CreatePost } from './CreatePost'
import Tweet from './Tweet'

const Feed = () => {
  return (
    <div className='w-[55%] mx-5 border border-gray-2' >
      <CreatePost/>
      <Tweet/>
      
    </div>
  )
}

export default Feed