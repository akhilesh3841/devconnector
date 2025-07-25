import { createSlice } from "@reduxjs/toolkit";


const requestslice=createSlice({
    name:"request",
    initialState:{
        request:null,
    },
    reducers:{
        addrequest:(state,action)=>{
            state.request=action.payload;
        },
        removerequest:(state,action)=>{
            state.request=null;
        }
    }
})


export const {addrequest,removerequest}=requestslice.actions;

export default requestslice.reducer;
