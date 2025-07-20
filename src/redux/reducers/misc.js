import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthTab:false,
    isDrawTab:true,
    Shapes:[]

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
        setShapes:(state,action)=>{
            state.Shapes = action.payload
        },
        addShape:(state,action)=>{
              state.Shapes.push(action.payload)
        }
    }
})

export default miscSlice

export const {
    setAuthTabClose,
    setAuthTabOpen,
    setDrawTabClose,
    setDrawTabOpen,
    setShapes,
    addShape,
} = miscSlice.actions