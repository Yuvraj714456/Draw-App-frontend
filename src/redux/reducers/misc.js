import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthTab:false,
    isDrawTab:true,
}

const miscSlice = createSlice({
    name:"misc",
    initialState,
    reducers:{
        setAuthTabOpen:(state)=>{
            state.isAuthTab = true
        },
        setAuthTabClose:(state)=>{
            state.isAuthTab=false;
        },
        setDrawTabOpen:(state)=>{
            state.isDrawTab=true;
        },
        setDrawTabClose:(state)=>{
            state.isDrawTab=false
        }
    }
})

export default miscSlice

export const {
    setAuthTabClose,
    setAuthTabOpen,
    setDrawTabClose,
    setDrawTabOpen
} = miscSlice.actions