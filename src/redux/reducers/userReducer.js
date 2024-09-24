import { createReducer } from "@reduxjs/toolkit";
import userActions from "../actions/userActions.js";

const { create_users, login_users,read_users, delete_users, update_users, update_passrowds, update_roles, create_registro_folios, create_registro_usuarios, read_folios_creados, read_usuarios_creados} = userActions;
const initialState = {
users: [],
read_usuarios_creados:[],
read_folios_creados:[]
}
const usersReducer = createReducer(initialState, (builder) => {
  builder
.addCase(create_users.fulfilled, (state, action)=>{
      return{
      ...state,
      users:action.payload
      }
 })
.addCase(login_users.fulfilled, (state, action)=>{
      return{
      ...state,
      users:action.payload
      }
 })
 .addCase(read_users.fulfilled, (state, action)=>{
  return{
  ...state,
  users:action.payload
  }
})
.addCase(delete_users.fulfilled, (state, action)=>{
  return{
  ...state,
  users:action.payload
  }
})
.addCase(update_users.fulfilled, (state, action)=>{
  return{
  ...state,
  users:action.payload
  }
})
.addCase(update_passrowds.fulfilled, (state, action)=>{
  return{
  ...state,
  admins:action.payload
  }
})
.addCase(update_roles.fulfilled, (state, action)=>{
  return{
  ...state,
  admins:action.payload
  }
})
.addCase(read_usuarios_creados.fulfilled, (state, action)=>{
  return{
  ...state,
  read_usuarios_creados:action.payload
  }
})
.addCase(read_folios_creados.fulfilled, (state, action)=>{
  return{
  ...state,
  read_folios_creados:action.payload
  }
})
.addCase(create_registro_folios.fulfilled, (state, action)=>{
  return{
  ...state,
  users:action.payload
  }
})
.addCase(create_registro_usuarios.fulfilled, (state, action)=>{
  return{
  ...state,
  users:action.payload
  }
})
})


export default usersReducer;