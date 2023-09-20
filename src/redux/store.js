import { configureStore } from "@reduxjs/toolkit";
import chapterReducer from "./reducers/reducer";


export const store = configureStore({
    reducer: {
        chapters:chapterReducer
      },
})