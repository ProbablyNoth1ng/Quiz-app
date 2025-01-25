import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState,   } from './store'
import { accordionActionsClasses } from '@mui/material'


const initialState = {
    currentPage:0,
}

export const currentPageSlice = createSlice({
    name:"currentPage",
    initialState,
    reducers:{
        setCurrentPage:(state,action) =>{
            state.currentPage = action.payload

        },
        NextPage:(state,action) => {
            state.currentPage += 1;
        }

    }
})


export const { setCurrentPage, NextPage } = currentPageSlice.actions
export default currentPageSlice.reducer