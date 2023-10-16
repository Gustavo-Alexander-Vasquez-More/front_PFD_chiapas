import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions.js';
import Swal from 'sweetalert2';

export default function CrearUsuario() {
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
  folios:folios,
  rol:selectedRole
  }
    try {
      if(datos){
      await dispatch(userActions.create_users(datos))
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario creado con éxito',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(userActions.read_users())
}else{
  Swal.fire({
    icon: 'error',
    title: 'Lo sentimos!',
    text: 'El usuario no ha podido ser creado.',
    })
}} catch (error) {
console.log(error);
}
}
return (
    <div className='w-full h-[90vh] bg-[url("https://static.vecteezy.com/system/resources/previews/002/848/473/non_2x/modern-white-background-with-shiny-gold-geometric-element-abstract-light-clean-silver-background-vector.jpg")] bg-cover'>
      <div className='w-full h-[10vh] flex items-center justify-center text-[2rem] px-[1.5rem] '>
        <p className='font-semibold'>Crea un usuario</p>
      </div>
      <div className='w-full h-[12vh] flex flex-col justify-center gap-2 lg:px-[7rem] px-[3rem]'>
        <p className='sm:text-[1.2rem] text-[1rem]'>Usuario</p>
        <input ref={inputNombre} onChange={captureNombre}
          className='border-solid border-[1px] border-gray-400 rounded-[5px] py-[0.3rem] px-[0.5rem] lg:w-[30%] w-[100%]'
          type="text"
          placeholder='Nombre de Usuario'
        />
      </div>
      <div className='w-full h-[12vh] flex flex-col justify-center gap-2 lg:px-[7rem] px-[3rem]'>
        <p className='sm:text-[1.2rem] text-[1rem]'>Contraseña</p>
        <div className='flex items-center gap-4'>
          <input 
            className='border-solid border-[1px] border-gray-400 rounded-[5px] py-[0.3rem] px-[0.5rem]  lg:w-[30%] w-[100%]'
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
             <svg class="w-6 h-6 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
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
      <div className='w-full h-[12vh] flex flex-col justify-center gap-2 lg:px-[7rem] px-[3rem]'>
        <p className='m:text-[1.2rem] text-[1rem]'>Folios</p>
        <input ref={inputFolios} onChange={captureFolios}
          className='border-solid border-[1px] border-gray-400 rounded-[5px] py-[0.3rem]  px-[0.5rem] lg:w-[30%] w-[100%]'
          type="number"
          placeholder='N° Folios'
        />
      </div>
      <div className='w-full lg:h-[30vh] h-[30vh]  flex flex-col justify-center gap-3 lg:px-[7rem] px-[3rem]'>
        <p className='lg:m:text-[1.2rem]  text-[1rem]'>Rol de Usuario</p>
        <div className='flex gap-2'>
        <input type="radio" value={1} checked={selectedRole === '1'}
            onChange={handleRoleChange} /><p className='lg:text-[1.1rem] text-[0.8rem]'>Rol 1 (Tiene todos los privilegios del sistema)</p>
        </div>
        <div  className='flex gap-2'>
        <input type="radio" value={2} checked={selectedRole === '2'}
            onChange={handleRoleChange}/><p className='tlg:text-[1.1rem] text-[0.8rem]'>Rol 2 (Tiene privilegios pero no puede crear ni gestionar usuarios)</p>
        </div>
        <div  className='flex gap-2'>
        <input type="radio" value={3} checked={selectedRole === '3'}
            onChange={handleRoleChange}/><p className='tlg:text-[1.1rem] text-[0.8rem]'>Rol 3 (Sin privilegios, solo puede crear y eliminar Altas)</p>
        </div>
      </div>
      <div className='w-full h-[12vh] flex  items-center gap-2 lg:px-[7rem] px-[3rem]'>
        <button onClick={crearUsuario} className='bg-[#17103a] hover:bg-[#4a399e] rounded-[5px] px-[1rem] py-[0.5rem] lg:w-[20%] w-[60%] text-white'>Crear</button>
      </div>
    </div>
  );
}
