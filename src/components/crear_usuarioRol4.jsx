import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions.js';
import Swal from 'sweetalert2';

export default function crear_usuarioRol4() {
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [folios, setFolios] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
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
      folios:0,
      rol:3,
      creador:localStorage.getItem('usuario')
      }
        try {
          if (!nombre || !password) {
            Swal.fire({
              icon: 'error',
              title: 'Completa todos los campos',
              text: 'Asegúrate de completar los campos.',
            });
            return;
          }
          if(datos){
          await dispatch(userActions.create_users(datos))
          dispatch(userActions.read_users())
    }} catch (error) {
    console.log(error);
    }
    }
    return (
      <div className='w-full flex justify-center items-center h-auto py-[1rem] min-h-[90vh] bg-[url("https://cdn.britannica.com/37/178937-050-21CBC6F1/Palenque-Temple-of-the-Inscriptions-Chiapas-Mexico.jpg")] bg-cover bg-no-repeat'>
      <div className='flex flex-col lg:w-[50%] w-[95%] gap-5 bg-[#ffffffa9] rounded-[10px] py-[1rem] px-[2rem]'>
      <div className='w-full h-auto flex items-center justify-center text-[2rem]  '>
        <p className='font-semibold underline'>Crea un usuario</p>
      </div>
      <div className='w-full h-auto flex flex-col justify-center gap-2 '>
        <p className=' text-[1rem] underline'>Usuario</p>
        <input ref={inputNombre} onChange={captureNombre}
          className='border-solid border-[1px] border-gray-400 rounded-[5px] py-[0.3rem] px-[0.5rem]  w-[100%]'
          type="text"
          placeholder='Nombre de Usuario'
        />
      </div>
      <div className='w-full h-auto flex flex-col justify-center gap-2 '>
        <p className=' text-[1rem] underline'>Contraseña</p>
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
             <svg class="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
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
      <div className='w-full h-auto flex justify-center items-center gap-2'>
        <button onClick={crearUsuario} className='bg-[#21349e] rounded-[5px] px-[1rem] py-[0.5rem] w-full text-white'>Crear</button>
      </div>
      </div>
      
    </div>
      );
    }