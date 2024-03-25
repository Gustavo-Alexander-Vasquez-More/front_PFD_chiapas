import { createReducer } from "@reduxjs/toolkit";
import userActions from "../actions/userActions.js";

const { create_users, login_users,read_users, delete_users, update_users, update_passrowds} = userActions;
const initialState = {
users: []
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
})


export default usersReducer;