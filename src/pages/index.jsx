import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as Anchor, useNavigate } from 'react-router-dom';
import userActions from '../redux/actions/userActions.js'
import Swal from 'sweetalert2';
export default function index() {
const dispatch=useDispatch()
const [usuario, setUsuario]=useState('')
const [contraseña, setContraseña]=useState('')
const inputUsuario=useRef()
const inputConstraseña=useRef()
const [type, setType]=useState('password')
const navigate=useNavigate()

function captureUsuario(){
setUsuario(inputUsuario.current.value)
}
function captureContraseña(){
setContraseña(inputConstraseña.current.value)
}
async function login(){
const datos={
usuario:usuario,
contraseña:contraseña
}
try {
  await dispatch(userActions.login_users(datos))
  const user = localStorage.getItem('token');
    if (user) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 3500
      })
      navigate('/panelAdmin')
}
} catch (error) {
  console.log(error);
}
}
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    // Si la tecla presionada es "Enter", llama a la función logIn
    login();
  }
}
function visible(){
  setType('text')
  }
  function invisible(){
  setType('password')
  }
  return (
    <div className='w-full h-screen  flex flex-col justify-center items-center bg-[url("https://cdn.britannica.com/37/178937-050-21CBC6F1/Palenque-Temple-of-the-Inscriptions-Chiapas-Mexico.jpg")] bg-cover bg-center bg-no-repeat  py-[3rem] '>
      <div className='lg:w-[50%] rounded-[10px] bg-[#ffffffbb] h-auto flex flex-col gap-7 py-[3rem]  sm:w-[60%] w-[95%] items-center'>
    <img className='lg:w-[20rem] sm:w-[15rem] w-[12rem]' src="https://seeklogo.com/images/E/escudo-del-estado-de-chiapas-logo-3717C7C766-seeklogo.com.png" alt="" />
    <div className=' w-full px-[1rem] flex flex-col gap-2 '>
    <p className='sm:text-[1rem] text-[1rem] underline font-semibold'>Usuario:</p>
    <input onKeyDown={handleKeyPress} required  ref={inputUsuario} onChange={captureUsuario} className='rounded-[5px] py-[0.3rem] px-[0.5rem] w-full border-solid border-[1px] border-[gray]' type="text" placeholder='Ingrese su usuario' />
    </div>
    <div className='w-full px-[1rem] flex flex-col gap-2'>
    <p className='sm:text-[1rem] text-[1rem] underline font-semibold'>Contraseña:</p>
    <div className='flex gap-2'>
    <input onKeyDown={handleKeyPress} required  ref={inputConstraseña} onChange={captureContraseña} className='rounded-[5px] py-[0.3rem] px-[0.5rem] w-full  border-solid border-[1px] border-[gray]' type={type} placeholder='Ingrese su contraseña'/>
    {type === 'password' && (
    <button onClick={visible}>
      <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
     <path d="m4 15.6 3-3V12a5 5 0 0 1 5-5h.5l1.8-1.7A9 9 0 0 0 12 5C6.6 5 2 10.3 2 12c.3 1.4 1 2.7 2 3.6Z"/>
     <path d="m14.7 10.7 5-5a1 1 0 1 0-1.4-1.4l-5 5A3 3 0 0 0 9 12.7l.2.6-5 5a1 1 0 1 0 1.4 1.4l5-5 .6.2a3 3 0 0 0 3.6-3.6 3 3 0 0 0-.2-.6Z"/>
     <path d="M19.8 8.6 17 11.5a5 5 0 0 1-5.6 5.5l-1.7 1.8 2.3.2c6.5 0 10-5.2 10-7 0-1.2-1.6-2.9-2.2-3.4Z"/>
   </svg>
    </button>
   
    )}
    {type === 'text' && (
    <button onClick={invisible}>
      <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M5 7.8C6.7 6.3 9.2 5 12 5s5.3 1.3 7 2.8a12.7 12.7 0 0 1 2.7 3.2c.2.2.3.6.3 1s-.1.8-.3 1a2 2 0 0 1-.6 1 12.7 12.7 0 0 1-9.1 5c-2.8 0-5.3-1.3-7-2.8A12.7 12.7 0 0 1 2.3 13c-.2-.2-.3-.6-.3-1s.1-.8.3-1c.1-.4.3-.7.6-1 .5-.7 1.2-1.5 2.1-2.2Zm7 7.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
    </svg>
    </button>
    )}
    </div>
    </div>
    <Anchor onClick={login}  className='w-[50%] bg-[#b2b42d] py-[0.5rem] rounded-[10px] text-[white] font-semibold text-center'>Ingresar</Anchor>
    </div>
    </div>
  );
}
