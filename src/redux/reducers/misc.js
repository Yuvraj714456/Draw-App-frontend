import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthTab:false,
    isDrawTab:true,
    Shapes:[],
    createRoomDialog:false,

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
        },
        setCreateRoomDialogOpen:(state)=>{
            state.createRoomDialog=true
        },
        setCreateRoomDialogClose:(state)=>{
            state.createRoomDialog=false
        }
    }
})

export default miscSlice

export const {
    setAuthTabClose,
    setAuthTabOpen,
    setDrawTabClose,
    setDrawTabOpen,
    setCreateRoomDialogClose,
    setCreateRoomDialogOpen,
} = miscSlice.actions