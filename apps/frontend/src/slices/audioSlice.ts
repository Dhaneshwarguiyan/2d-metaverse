import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    play:true
}

const audioSlice = createSlice({
    name:"audio",
    initialState:initialState,
    reducers:{
        toggleAudio:(state)=>{
            state.play = !state.play;
        }
    }
})

export const {toggleAudio} = audioSlice.actions;
export default audioSlice.reducer;