import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const read_AllAntecedentes = createAsyncThunk(
    'read_AllAntecedentes', 
    async()=>{
        try {
        const {data}=await axios.get('https://backpdfchiapas-production.up.railway.app/api/antecedentes/todos')
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
        const {data}=await axios.get(`https://backpdfchiapas-production.up.railway.app/api/antecedentes?page=${page}`)
        console.log(data);
      return data
        } catch (error) {
        }
    } 
    )
    const read_AntecedentesAuth = createAsyncThunk(
      'read_AntecedentesAuth', 
      async(payload)=>{
          const { author, page } = payload;
          console.log(author);
      try {
      const {data}=await axios.get(`https://backpdfchiapas-production.up.railway.app/api/antecedentes/author?author=${author}&page=${page}`)
     console.log(data);
      
      return data
      } catch (error) {
          console.log(error);
      }
      } 
      )
    const create_antecedentes = createAsyncThunk(
      'create_antecedentes', 
      async(datos)=>{
          try {
          const {data}=await axios.post('https://backpdfchiapas-production.up.railway.app/api/antecedentes/create', datos)
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
            const { data } = await axios.delete('https://backpdfchiapas-production.up.railway.app/api/antecedentes/delete', {
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
            const {data}=await axios.put(`https://backpdfchiapas-production.up.railway.app/api/antecedentes/update/${parametro}`, datos)
            thunkAPI.dispatch(read_antecedentes());
            return data.response
            } catch (error) {
            }
        } 
      )
const antecedentes_actions={read_antecedentes, create_antecedentes, delete_antecedentes, update_antecedentes, read_AllAntecedentes, read_AntecedentesAuth}
export default antecedentes_actions