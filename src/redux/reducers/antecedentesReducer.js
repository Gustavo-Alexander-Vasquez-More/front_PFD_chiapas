import { createReducer } from "@reduxjs/toolkit";
import antecedentes_actions from "../actions/antecedentesActions.js";
const {read_antecedentes, create_antecedentes, delete_antecedentes, update_antecedentes, read_AllAntecedentes, read_AntecedentesAuth  } = antecedentes_actions;
const initialState = {
antecedentes: [],
AllAntecedentes:[],
AntecedentesAuth:[]
}
const antecedentesReducer = createReducer(initialState, (builder) => {
    builder
  .addCase(read_antecedentes.fulfilled, (state, action)=>{
        return{
        ...state,
        antecedentes:action.payload
        }
   })
   .addCase(create_antecedentes.fulfilled, (state, action)=>{
    return{
    ...state,
    antecedentes:action.payload
    }
})
.addCase(delete_antecedentes.fulfilled, (state, action)=>{
  return{
  ...state,
  antecedentes:action.payload
  }
})
.addCase(update_antecedentes.fulfilled, (state, action)=>{
  return{
  ...state,
  antecedentes:action.payload
  }
})
.addCase(read_AllAntecedentes.fulfilled, (state, action)=>{
  return{
  ...state,
  AllAntecedentes:action.payload
  }
})
.addCase(read_AntecedentesAuth.fulfilled, (state, action)=>{
  return{
  ...state,
  AntecedentesAuth:action.payload
  }
})
})


export default antecedentesReducer;