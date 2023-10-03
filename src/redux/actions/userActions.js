import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const create_users = createAsyncThunk(
    'create_users', 
    async(datos)=>{
        try {
        const {data}=await axios.post('http://localhost:8085/api/admins/create', datos)
        console.log(data.response);
      return data.response
        } catch (error) {
        }
    } 
    )
    const login_users = createAsyncThunk(
      'login_users', 
      async(datos)=>{
          try {
          const {data}=await axios.post('http://localhost:8085/api/admins/login', datos)
          console.log(data.response);
          let token = data.response.token;
          localStorage.setItem('token', token);
          localStorage.setItem('usuario', data.response.usuario); 
          localStorage.setItem('rol', data.response.rol )
          localStorage.setItem('folios', data.response.folios)
        return data.response
          } catch (error) {
          }
      } 
      )
      const read_users = createAsyncThunk(
        'read_users', 
        async()=>{
            try {
            const {data}=await axios.get('http://localhost:8085/api/admins')
            console.log(data.response);
          return data.response
            } catch (error) {
            }
        } 
        )
        const delete_users = createAsyncThunk(
          'delete_users', 
          async(datitos)=>{
            
              try {
              const {data}=await axios.delete('http://localhost:8085/api/admins/delete', {
                data: datitos, 
              });
              thunkAPI.dispatch(read_admins());
              console.log(data.response);
            return data.response
              } catch (error) {
              }
          } 
          )
          const update_users = createAsyncThunk(
            'update_users', 
            async (payload) => {
              const { usuario, folios } = payload;
              console.log(usuario);
              console.log(folios);
                try {
                const {data}=await axios.put(`http://localhost:8085/api/admins/update/${usuario}`,{
                  folios:folios})
                  thunkAPI.dispatch(read_admins());
                return data.response
                } catch (error) {
                }
            } 
          )
const userActions = {create_users, login_users,read_users, delete_users, update_users}
export default userActions