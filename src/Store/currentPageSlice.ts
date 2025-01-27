import { createSlice } from '@reduxjs/toolkit'

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
        NextPage:(state) => {
            state.currentPage += 1;
        }

    }
})


export const { setCurrentPage, NextPage } = currentPageSlice.actions
export default currentPageSlice.reducer