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
const antecedentes_actions={read_antecedentes}
export default antecedentes_actions