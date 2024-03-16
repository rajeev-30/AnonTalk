import React, { useState } from 'react'

const Login = () => {
    const [isLogin,setIsLogin] = useState(true);
    const LoginSingupHandler = () => {
        setIsLogin(!isLogin);
    }
  return (
    <div>
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='flex items-center justify-evenly w-[80%]'>
                <div>
                    <img width={"400px"} src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?w=1380&t=st=1710528191~exp=1710528791~hmac=3fbd0810e89d3bc771029903c81a6097e1c2caa2ee48c58b675dc437639cfc02" alt=''/>
                </div>
                <div>
                    <div className='font-bold text-6xl my-5'>Happening Now...</div>
                    <h1 className='font-bold text-2xl my-4'>{isLogin?"Login":"Signup"}</h1>
                    <form className='flex flex-col gap-2 w-[55%]'>
                        {
                            !isLogin && (<>
                                <input className='outline-none border border-gray-800 px-4 py-2 rounded-full font-semibold' type="text" placeholder="Name"/>
                                <input className='outline-none border border-gray-800 px-4 py-2 rounded-full font-semibold' type="text" placeholder="Username"/>
                            </>)
                        }
                        <input className='outline-none border border-gray-800 px-4 py-2 rounded-full font-semibold' type="text" placeholder="Email"/>
                        <input className='outline-none border border-gray-800 px-4 py-2 rounded-full font-semibold' type="text" placeholder="Password"/>
                       
                        <button className='bg-black text-white border-none py-2 my-4 rounded-full text-lg font-bold'>{isLogin? "Login":"Create an account"}</button>
                        <h1>{isLogin? "Don't have an account? ":"Already have an account? "} <span onClick={LoginSingupHandler} className='hover:cursor-pointer font-bold text-blue-500'> {isLogin? "Register":"Login"}</span></h1>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login