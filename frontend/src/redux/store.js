import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice';

const store =  configureStore({
    reducer:{
        //Action
        user:userSlice,
    }
})

export default store;