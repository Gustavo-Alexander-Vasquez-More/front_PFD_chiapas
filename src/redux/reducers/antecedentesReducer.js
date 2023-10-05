import { createReducer } from "@reduxjs/toolkit";
import antecedentes_actions from "../actions/antecedentesActions";
const {read_antecedentes  } = antecedentes_actions;
const initialState = {
antecedentes: []
}
const antecedentesReducer = createReducer(initialState, (builder) => {
    builder
  .addCase(read_antecedentes.fulfilled, (state, action)=>{
        return{
        ...state,
        antecedentes:action.payload
        }
   })
})


export default antecedentesReducer;