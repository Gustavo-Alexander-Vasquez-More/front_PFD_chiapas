import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions.js';
import Swal from 'sweetalert2';

export default function CrearUsuario() {
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [folios, setFolios] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]=useState(false)
  const [selectedRole, setSelectedRole] = useState(null);
  const fecha= new Date()
const dia=fecha.getDate().toString().padStart(2, '0')
const mes=(fecha.getMonth()+1).toString().padStart(2, '0')
const año=fecha.getFullYear()
const hora=fecha.getHours().toString().padStart(2, '0')
const minuto=fecha.getMinutes().toString().padStart(2, '0')

const fecha_hoy=`${dia}/${mes}/${año}`
const horarios=`${hora}:${minuto}`
  const dispatch=useDispatch()
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};
const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
};
const inputNombre =useRef()
const inputFolios =useRef()

function captureNombre(){
    setNombre(inputNombre.current.value)
}
function captureFolios(){
    setFolios(inputFolios.current.value)
}

async function crearUsuario(){
  const datos={
  usuario:nombre,
  contraseña:password,
  folios:folios,
  rol:selectedRole
  }
  const datos2 = {
    usuario_admin:localStorage.getItem('usuario'),
    usuario_cliente: nombre,
    fecha:fecha_hoy,
    horario:horarios
  };
  const datos3 = {
    usuario_admin:localStorage.getItem('usuario'),
    usuario_cliente: nombre,
    folios:folios,
    fecha:fecha_hoy,
    horario:horarios
  };
    try {
      if (!nombre || !password || !folios || !selectedRole) {
        Swal.fire({
          icon: 'error',
          title: 'Completa todos los campos',
          text: 'Asegúrate de completar los campos.',
        });
        return;
      }
      if(datos){
      setLoading(true)
      await dispatch(userActions.create_registro_usuarios(datos2))
      await dispatch(userActions.create_registro_folios(datos3))
      await dispatch(userActions.create_users(datos))
      await dispatch(userActions.read_users())
      
      setLoading(false)
}} catch (error) {
console.log(error);
}
}
return (
  <>
  
  {loading === true && (
    <div className='w-full bg-[#ffffff9f] absolute flex justify-center items-center h-[100vh]  flex-col gap-2'>
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p className='font-semibold'>Cargando por favor espere...</p>
    </div>
  )}
    <div className='w-full py-[1rem] h-auto min-h-[90vh] flex justify-center items-center bg-[url("https://media.gq.com.mx/photos/5d503b24e640cd0009a4511a/16:9/w_2560%2Cc_limit/GettyImages-537315513.jpg")] bg-cover'>
      <div className='flex flex-col gap-5 items-center lg:w-[50%] w-[95%] h-auto px-[2rem] py-[1rem] bg-[#ffffffbb] rounded-[10px]'>
      <div className='w-full h-auto flex items-center justify-center text-[2rem]'>
        <p className='font-semibold underline'>Crea un usuario</p>
      </div>
      <div className='w-full h-auto flex flex-col  gap-2 '>
          <p className='text-[1rem] underline font-semibold'>Usuario</p>
        <input ref={inputNombre} onChange={captureNombre}
          className='border-solid border-[1px] border-gray-400 rounded-[5px] py-[0.3rem] px-[0.5rem] w-[100%]'
          type="text"
          placeholder='Nombre de Usuario'
        />
      </div>
      <div className='w-full h-auto flex flex-col  gap-2 '>
        <p className='text-[1rem] underline font-semibold'>Contraseña</p>
        <div className='flex items-center gap-4'>
          <input 
            className='border-solid border-[1px] border-gray-400 rounded-[5px] py-[0.3rem] px-[0.5rem] w-[100%]'
            type={showPassword ? 'text' : 'password'}
            placeholder='Contraseña'
            value={password}
            onChange={handlePasswordChange}
          />
          <span
            className='cursor-pointer'
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
             <svg class="w-6 h-6 text-black " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
           </svg>
            ) : (
                <svg className='w-7 h-6 text-black' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z'
                />
              </svg>
              
            )}
          </span>
        </div>
      </div>
      <div className='w-full h-auto flex flex-col justify-center gap-2 '>
        <p className='underline font-semibold text-[1rem]'>Folios</p>
        <input ref={inputFolios} onChange={captureFolios}
          className='border-solid border-[1px] border-gray-400 rounded-[5px] py-[0.3rem]  px-[0.5rem] w-[100%]'
          type="number"
          placeholder='N° Folios'
        />
      </div>
      <div className='w-full h-auto  flex flex-col justify-center gap-3 '>
        <p className='text-[1rem] underline font-semibold'>Rol de Usuario</p>
        <div className='flex gap-2'>
        <input type="radio" value={1} checked={selectedRole === '1'}
            onChange={handleRoleChange} /><p className='lg:text-[1rem] text-[0.8rem]'>Rol 1 (Tiene todos los privilegios del sistema)</p>
        </div>
        <div  className='flex gap-2'>
        <input type="radio" value={2} checked={selectedRole === '2'}
            onChange={handleRoleChange}/><p className='lg:text-[1rem] text-[0.8rem]'>Rol 2 (Tiene privilegios pero no puede crear ni gestionar usuarios)</p>
        </div>
        <div  className='flex gap-2'>
        <input type="radio" value={3} checked={selectedRole === '3'}
            onChange={handleRoleChange}/><p className='lg:text-[1rem] text-[0.8rem]'>Rol 3 (Sin privilegios, solo puede crear y eliminar Altas)</p>
        </div>
        <div  className='flex gap-2'>
    <input type="radio" value={4} checked={selectedRole === '4'}
        onChange={handleRoleChange}/><p className='lg:text-[1rem] text-[0.8rem]'>Rol 4 (Usuario revendedor de folios, puede crear y eliminar sus usuarios)</p>
    </div>
      </div>
      <div className='w-full h-auto flex justify-center  items-center gap-2 '>
        <button onClick={crearUsuario} className='bg-[#17103a] hover:bg-[#4a399e] rounded-[5px] px-[1rem] py-[0.5rem] font-semibold w-[60%] text-white'>Crear Usuario</button>
      </div>
      </div>
    </div>
  </>
  );
}
