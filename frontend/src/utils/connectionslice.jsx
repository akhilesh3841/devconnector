import { createSlice } from "@reduxjs/toolkit";
const connectionslice=createSlice({
    name:"connection",
    initialState:{
        connection:null
    },
    reducers:{
        addconnection:(state,action)=>{
            state.connection=action.payload
        },
        removeconnection:(state)=>{
            state.connection=null
        }
    }
})

export const {addconnection,removeconnection}=connectionslice.actions

export default connectionslice.reducer