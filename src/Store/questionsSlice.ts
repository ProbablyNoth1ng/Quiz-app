import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState,   } from './store'
import { QuestionsState,Question } from '../types';

const initialState: QuestionsState = {
  questions: [],
  answers:[],
  loading: false,
  error: null,
};


export const QuestionsSlice = createSlice({
  name: 'questions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    setQuestions: (state,action:PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.loading = false
      state.error = null
    },
    setAnswers: (state, action: PayloadAction<string | boolean>) => {
      state.answers = [...state.answers, action.payload];
    },
    resetAnswers: (state) => {
      state.answers = [];
    }
  },
})

export const { setQuestions, setAnswers } = QuestionsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectQuestions = (state: RootState) => state.questions

export default QuestionsSlice.reducer