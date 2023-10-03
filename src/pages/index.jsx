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
const navigate=useNavigate()
useEffect(() => {
  const userToken = localStorage.getItem('token');
  if (userToken) {
    // Si existe un token, redirige al panel de administrador
    navigate('/panelAdmin');
  }
}, [navigate]);
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
}else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Usuario o contraseña incorrectos',
})
  navigate('/')
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
  return (
    <div className='w-full h-screen  flex flex-col items-center  py-[3rem] '>
  <img className='lg:w-[25rem] lg:h-[9rem] sm:w-[23rem] w-[15rem]' src="https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/index%2Flogochiapas%20(2).png?alt=media&token=f91ff33d-3dc3-4617-8359-a95e29318fa3" alt="" />
    <div className='lg:w-[45%]  h-auto flex flex-col gap-7 py-[3rem]  xl:w-[35%] 2xl:w-[35%] sm:w-[60%] w-[85%] items-center'>
    <div className=' w-full px-[1rem] flex flex-col gap-2 '>
    <p className='sm:text-[1.2rem] text-[1rem]'>Usuario:</p>
    <input onKeyDown={handleKeyPress} required  ref={inputUsuario} onChange={captureUsuario} className='rounded-[5px] py-[0.3rem] px-[0.5rem] w-full border-solid border-[1px] border-[gray]' type="text" placeholder='Ingrese su usuario' />
    </div>
    <div className='w-full px-[1rem] flex flex-col gap-2'>
    <p className='sm:text-[1.2rem] text-[1rem]'>Contraseña:</p>
    <input onKeyDown={handleKeyPress} required  ref={inputConstraseña} onChange={captureContraseña} className='rounded-[5px] py-[0.3rem] px-[0.5rem] w-full  border-solid border-[1px] border-[gray]' type="password" placeholder='Ingrese su contraseña'/>
    </div>
    <Anchor onClick={login}  className='w-[50%] bg-[#428ee4] py-[0.5rem] rounded-[10px] text-[white] text-center'>Ingresar</Anchor>
    </div>
    </div>
  );
}
