import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
const create_users = createAsyncThunk(
    'create_users', 
    async(datos)=>{
      console.log(datos);
        try {
        const {data}=await axios.post('https://backpdfchiapas-production.up.railway.app/api/admins/create', datos)
        
      return data.response
        } catch (error) {
        console.log(error);
        }
    } 
    )
    const login_users = createAsyncThunk(
      'login_users', 
      async(datos)=>{
          try {
          const {data}=await axios.post('https://backpdfchiapas-production.up.railway.app/api/admins/login', datos)
          ;
          let token = data.response.token;
          localStorage.setItem('token', token);
          localStorage.setItem('usuario', data.response.usuario); 
          localStorage.setItem('rol', data.response.rol )
          localStorage.setItem('folios', data.response.folios)
        return data.response
          } catch (error) {
            Swal.fire({
              icon: "error",
              text: error.response.data.message,
            });
          }
      } 
      )
      const read_users = createAsyncThunk(
        'read_users', 
        async()=>{
            try {
            const {data}=await axios.get('https://backpdfchiapas-production.up.railway.app/api/admins')
            ;
          return data.response
            } catch (error) {
            }
        } 
        )
        const delete_users = createAsyncThunk(
          'delete_users', 
          async(datitos)=>{
            
              try {
              const {data}=await axios.delete('https://backpdfchiapas-production.up.railway.app/api/admins/delete', {
                data: datitos, 
              });
              thunkAPI.dispatch(read_admins());
              ;
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
                const {data}=await axios.put(`https://backpdfchiapas-production.up.railway.app/api/admins/update/${usuario}`,{
                  folios:folios})
                  thunkAPI.dispatch(read_admins());
                return data.response
                } catch (error) {
                }
            } 
          )
          const update_passrowds = createAsyncThunk(
            'update_passrowds', 
            async (payload) => {
              const { usuario, contraseña } = payload;
              console.log(usuario);
              console.log(contraseña);
              try {
                const {data}=await axios.put(`https://backpdfchiapas-production.up.railway.app/api/admins/updatePassword/${usuario}`,{
                  contraseña:contraseña})
                  
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `La contraseña ha sido actualizada con éxito!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  window.location.reload()
                  thunkAPI.dispatch(read_users());
                  
                return data.response
                } catch (error) {
                }
            } 
          )
          const update_roles = createAsyncThunk(
            'update_roles', 
            async (payload) => {
              const { usuario, rol} = payload;
              console.log(usuario);
              console.log(rol);
              try {
                const {data}=await axios.put(`https://backpdfchiapas-production.up.railway.app/api/admins/update/${usuario}`,{
                  rol:rol})
                  
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `El rol ha sido actualizado con éxito!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  window.location.reload()
                  thunkAPI.dispatch(read_users());
                  
                return data.response
                } catch (error) {
                }
            } 
          )
          const read_usuarios_creados = createAsyncThunk(
            'read_usuarios_creados', 
            async(page)=>{
            try {
            const {data}=await axios.get(`https://backpdfchiapas-production.up.railway.app/api/registro_usuarios/readPag?page=${page}`)
           console.log(data);
            
            return data
            } catch (error) {
                console.log(error);
            }
            } 
            )
            const read_folios_creados = createAsyncThunk(
              'read_folios_creados', 
              async(page)=>{
              try {
              const {data}=await axios.get(`https://backpdfchiapas-production.up.railway.app/api/registro_folios/readPag?page=${page}`)
             console.log(data);
              
              return data
              } catch (error) {
                  console.log(error);
              }
              } 
              )
              const create_registro_usuarios = createAsyncThunk(
                'create_registro_usuarios', 
                async(datos2)=>{
                    try {
                    const {data}=await axios.post('https://backpdfchiapas-production.up.railway.app/api/registro_usuarios/create', datos2)
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: `Usuario creado con éxito!`,
                      showConfirmButton: false,
                      timer: 1500
                    });
                  return data.response
                    } catch (error) {
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: `Este usuario ya existe!`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                    }
                } 
                )
                const create_registro_folios = createAsyncThunk(
                  'create_registro_folios', 
                  async(datos3)=>{
                      try {
                      const {data}=await axios.post('https://backpdfchiapas-production.up.railway.app/api/registro_folios/create', datos3)
                      
                    return data.response
                      } catch (error) {
                       console.log(error);
                  } }
                  )
const userActions = {create_users, login_users,read_users, delete_users, update_users,update_passrowds, update_roles, create_registro_folios, create_registro_usuarios, read_folios_creados, read_usuarios_creados}
export default userActions