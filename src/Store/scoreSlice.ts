import { createSlice } from '@reduxjs/toolkit'
import { ScoreState } from '../types';

const initialState: ScoreState = {
  score:0,
};


export const scoreSlice = createSlice({
    name:'score',
    initialState,
    reducers:{
        increaseScore:(state) =>{
            state.score += 1
        },
        resetScore:(state) => {
            state.score = 0;
        }

    }
})



export const { increaseScore,resetScore } = scoreSlice.actions

export default scoreSlice.reducer
