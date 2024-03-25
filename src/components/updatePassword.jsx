import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions/userActions';
import Swal from 'sweetalert2';
export default function updatePassword() {
const [selectUser, setSelectUser] = useState('');
const [password, setPassword]=useState('')
const [type, setType]=useState('password')
const dispatch = useDispatch();
const inputPassword=useRef()
const inputSelectUser = useRef();
useEffect(() => {dispatch(userActions.read_users());}, [dispatch]);
const admins = useSelector((store) => store?.users?.users) || [];
console.log(admins);
function captureSelect() {setSelectUser(inputSelectUser.current.value.trim());}
function capturePassword(){setPassword(inputPassword.current.value)}
function visible(){
    setType('text')
    }
    function invisible(){
    setType('password')
    }
async function updatePasswords(){
try {
    if(password && selectUser){
        const payload = {
            usuario: selectUser,
            contraseña: password,
          };
    await dispatch(userActions.update_passrowds(payload))
    await dispatch(userActions.read_users())
    }
    if(!password){
        Swal.fire("Escriba una constraseña para el usuario.");
        }
} catch (error) {
    
}
}
return (
    <div className='flex justify-center items-center w-full h-[90vh] bg-[url("https://www.gc.cuny.edu/sites/default/files/styles/1135x640/public/2023-08/5%20City%20of%20Science%20Cybersecurity.webp?h=8abcec71&itok=H7jwZwN0")] bg-cover bg-no-repeat'>
      <div className='bg-[white] rounded-[10px] border-solid border-[1px] border-[gray] lg:w-[45%] w-[95%] h-auto flex flex-col'>
        <div className=' border-b-[1px] gap-2 py-[1rem] border-solid border-[gray] flex justify-center items-center'>
            <p className='lg:text-[1.5rem]'>Cambio de Contraseñas</p>
            <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
            </svg>
    </div>
    <div className='w-full h-auto flex flex-col items-center py-[1rem] px-[1rem]'>
        <div className='flex flex-col gap-2 w-full'>
            <p>Elige el usuario a editar</p>
            <select
          onChange={captureSelect}
          ref={inputSelectUser}
          value={selectUser}
          className='w-full border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[0.8rem] h-[2.1rem]'
          
        >
          <option value=''>Selecciona un usuario</option>
          {admins.length > 0 && admins?.map((admin) => (
    <option key={admin._id} value={admin.usuario}>
        {admin.usuario}
    </option>
))}
        </select>
        </div>
    {selectUser && (
        <div className='flex flex-col items-center mt-[1rem] gap-2 w-full'>
            <p>Escribe la nueva contraseña para el usuario: {selectUser}</p>
            <div className='flex gap-2 w-full'>
            <input ref={inputPassword} onChange={capturePassword} type={type} placeholder='Escribe una nueva constraseña' className='border-solid w-full border-[1px] py-[0.3rem] px-[0.5rem] rounded-[5px] border-[gray]' />
            {type === 'password' && (
    <button onClick={visible}>
      <svg class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
     <path d="m4 15.6 3-3V12a5 5 0 0 1 5-5h.5l1.8-1.7A9 9 0 0 0 12 5C6.6 5 2 10.3 2 12c.3 1.4 1 2.7 2 3.6Z"/>
     <path d="m14.7 10.7 5-5a1 1 0 1 0-1.4-1.4l-5 5A3 3 0 0 0 9 12.7l.2.6-5 5a1 1 0 1 0 1.4 1.4l5-5 .6.2a3 3 0 0 0 3.6-3.6 3 3 0 0 0-.2-.6Z"/>
     <path d="M19.8 8.6 17 11.5a5 5 0 0 1-5.6 5.5l-1.7 1.8 2.3.2c6.5 0 10-5.2 10-7 0-1.2-1.6-2.9-2.2-3.4Z"/>
   </svg>
    </button>
   
    )}
    {type === 'text' && (
    <button onClick={invisible}>
      <svg class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M5 7.8C6.7 6.3 9.2 5 12 5s5.3 1.3 7 2.8a12.7 12.7 0 0 1 2.7 3.2c.2.2.3.6.3 1s-.1.8-.3 1a2 2 0 0 1-.6 1 12.7 12.7 0 0 1-9.1 5c-2.8 0-5.3-1.3-7-2.8A12.7 12.7 0 0 1 2.3 13c-.2-.2-.3-.6-.3-1s.1-.8.3-1c.1-.4.3-.7.6-1 .5-.7 1.2-1.5 2.1-2.2Zm7 7.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
    </svg>
    </button>
    )}
            </div>
    {password && (
        <button onClick={updatePasswords} className='lg:w-[30%] w-[90%] bg-[#33a5e7] rounded-[5px] text-white font-semibold py-[0.3rem] px-[1rem] text-center'>Actualizar Contraseña</button>
    )}
        </div>
    )}
    </div>
      </div>
    </div>
  );
}