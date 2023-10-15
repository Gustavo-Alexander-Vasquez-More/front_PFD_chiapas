import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const read_AllAntecedentes = createAsyncThunk(
    'read_AllAntecedentes', 
    async()=>{
        try {
        const {data}=await axios.get('http://localhost:8085/api/antecedentes/todos')
        console.log(data.response);
      return data.response
        } catch (error) {
        }
    } 
    )
    const read_antecedentes = createAsyncThunk(
    'read_antecedentes', 
    async(page)=>{
        try {
        const {data}=await axios.get(`http://localhost:8085/api/antecedentes?page=${page}`)
        console.log(data);
      return data
        } catch (error) {
        }
    } 
    )
    const create_antecedentes = createAsyncThunk(
      'create_antecedentes', 
      async(datos)=>{
          try {
          const {data}=await axios.post('http://localhost:8085/api/antecedentes/create', datos)
          console.log(data.response);
        return data.response
          } catch (error) {
          }
      } 
      )
      const delete_antecedentes = createAsyncThunk(
        'delete_antecedentes',
        async (datitos) => {
          try {
            const { data } = await axios.delete('http://localhost:8085/api/antecedentes/delete', {
              data: datitos, 
            });
            thunkAPI.dispatch(read_admins());
          return data.response;
          } catch (error) {
            return null;
          }
        }
      )
      const update_antecedentes = createAsyncThunk(
        'update_antecedentes', 
        async (payload) => {
          const { parametro, datos } = payload;
          console.log(parametro);
          console.log(datos);
            try {
            const {data}=await axios.put(`http://localhost:8085/api/antecedentes/update/${parametro}`, datos)
            thunkAPI.dispatch(read_antecedentes());
            return data.response
            } catch (error) {
            }
        } 
      )
const antecedentes_actions={read_antecedentes, create_antecedentes, delete_antecedentes, update_antecedentes, read_AllAntecedentes}
export default antecedentes_actions