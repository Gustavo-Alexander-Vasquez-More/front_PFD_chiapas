import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const read_antecedentes = createAsyncThunk(
    'read_antecedentes', 
    async()=>{
        try {
        const {data}=await axios.get('http://localhost:8085/api/antecedentes')
        console.log(data.response);
      return data.response
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
const antecedentes_actions={read_antecedentes, create_antecedentes}
export default antecedentes_actions