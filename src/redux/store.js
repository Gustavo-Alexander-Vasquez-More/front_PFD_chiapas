import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/userReducer.js";


export const store = configureStore({
    reducer: {
        users:usersReducer
        
      },
})