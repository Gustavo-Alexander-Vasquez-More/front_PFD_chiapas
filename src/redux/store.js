import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/userReducer.js";
import antecedentesReducer from './reducers/antecedentesReducer.js'

export const store = configureStore({
    reducer: {
        users:usersReducer,
        antecedentes:antecedentesReducer
      },
})