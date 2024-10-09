import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions/userActions.js';
import Swal from 'sweetalert2';
import NavBar from './Navbar.jsx';
export default function updateRol() {
    const [selectUser, setSelectUser] = useState('');
    const [rol, setRol]=useState('')
    const dispatch = useDispatch();
    const inputRol=useRef()
    const inputSelectUser = useRef();
    useEffect(() => {dispatch(userActions?.read_users());}, [dispatch]);
    const admins = useSelector((store) => store?.users?.users) || [];
    const adminFilter=admins?.filter(ad=>ad.usuario === selectUser)
    const adminRol=adminFilter[0]?.rol
    console.log(adminRol);
    function captureSelect() {setSelectUser(inputSelectUser.current.value.trim());}
    function captureRol(){setRol(inputRol.current.value)}
   
    async function updatePasswords(){
    try {
        if(rol && selectUser){
            const payload = {
                usuario: selectUser,
                rol: rol,
              };
        await dispatch(userActions.update_roles(payload))
        await dispatch(userActions.read_users())
        }
        if(!rol){
            Swal.fire("Escriba el rol para el usuario.");
            }
    } catch (error) {
        
    }
    }
    return (
       <>
       <NavBar/>
       <div className='w-full h-[90vh] flex justify-center items-center bg-[url("https://media.gq.com.mx/photos/5d503b24e640cd0009a4511a/16:9/w_2560%2Cc_limit/GettyImages-537315513.jpg")] bg-no-repeat bg-cover'>
          <div className='bg-[white] rounded-[10px] border-solid border-[1px] border-[gray] lg:w-[45%] w-[95%] h-auto flex flex-col'>
            <div className=' border-b-[1px] gap-2 py-[1rem] border-solid border-[gray] flex justify-center items-center'>
                <p className='lg:text-[1.5rem]'>Cambiar rol a usuarios</p>
                <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                </svg>
        </div>
        <div className='w-full h-auto flex flex-col items-center py-[1rem] px-[1rem]'>
            <div className='flex flex-col gap-2 w-full'>
                
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
                <p>El usuario {selectUser} tiene actualmente el rol {adminRol}</p>
                <div className='flex gap-2 w-full'>
                <input ref={inputRol} onChange={captureRol} type='text' placeholder='Escribe el rol' className='border-solid w-full border-[1px] py-[0.3rem] px-[0.5rem] rounded-[5px] border-[gray]' />
                
                </div>
        {rol && (
            <button onClick={updatePasswords} className='lg:w-[50%] w-[90%] bg-[#33a5e7] rounded-[5px] text-white font-semibold py-[0.3rem] px-[1rem] text-center'>Actualizar Rol</button>
        )}
            </div>
        )}
        </div>
          </div>
        </div>
       </>
      );
    }