import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from './questionsSlice'
import currentPageReducer from './currentPageSlice'
import scoreReducer from './scoreSlice'
const store = configureStore({
    reducer: {
      questions: questionsReducer,
      currentPage: currentPageReducer,
      score: scoreReducer,
    },
  })
  


  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  export {store}    