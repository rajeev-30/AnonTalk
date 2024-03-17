import React, { useState } from 'react'
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {getUser} from '../redux/userSlice'

const Login = () => {
    const [isLogin,setIsLogin] = useState(true);
    const [name,setName] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const submitHandler = async(e) =>{
        e.preventDefault();
        if(isLogin){
            //Login
            try {
                const res = await axios.post(`${USER_API_END_POINT}/login`, {username,password}, {
                    headers:{
                        "Content-Type":"application/json"
                    },
                    withCredentials:true
                });
                dispatch(getUser(res?.data?.user));
                if(res.data.status){
                    navigate("/");
                    toast.success(res.data.message);
                }
            } catch (error) {
                toast.success(error.response.data.message);
                console.log(error);
            }
        }else{
            //Sign in
            try {
                const res = await axios.post(`${USER_API_END_POINT}/register`, {name,username,email,password}, {
                    headers:{
                        "Content-Type":"application/json"
                    },
                    withCredentials:true
                });
                if(res.data.status){
                    setIsLogin(true);
                    toast.success(res.data.message);
                }
            } catch (error) {
                toast.success(error.response.data.message);
                console.log(error);
            }
        }
    }
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
                    <form onSubmit={submitHandler} className='flex flex-col gap-2 w-[55%]'>
                        {
                            !isLogin && (<>
                                <input className='outline-none border border-gray-800 px-4 py-2 rounded-full font-semibold' type="text" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}/>
                            </>)
                        }
                        <input className='outline-none border border-gray-800 px-4 py-2 rounded-full font-semibold' type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                        {
                            !isLogin && (<>
                                <input className='outline-none border border-gray-800 px-4 py-2 rounded-full font-semibold' type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                            </>)
                        }
                        <input className='outline-none border border-gray-800 px-4 py-2 rounded-full font-semibold' type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                       
                        <button className='bg-black text-white border-none py-2 my-4 rounded-full text-lg font-bold' >{isLogin? "Login":"Create an account"}</button>
                        <h1>{isLogin? "Don't have an account? ":"Already have an account? "} <span onClick={LoginSingupHandler} className='hover:cursor-pointer font-bold text-blue-500'> {isLogin? "Register":"Login"}</span></h1>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login