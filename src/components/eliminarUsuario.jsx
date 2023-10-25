import React, { useEffect, useRef, useState } from 'react';
import userActions from '../redux/actions/userActions.js'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

export default function eliminarUsuario() {
    const [selectUser, setSelectUser] = useState('');
  const dispatch = useDispatch();
  const inputSelectUser = useRef();
  
  
  useEffect(() => {
    dispatch(userActions?.read_users());
  }, [dispatch]);
  const usuarios = useSelector((store) => store?.users?.users);
  
  async function deleteUser() {
    try {
      const datitos = {
        usuario: selectUser,
      };

      if (datitos.usuario) {
        const confirmation = await Swal.fire({
        title: `¿Estás seguro de que deseas eliminar el usuario ${selectUser} ?`,
        showDenyButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: 'No',
        });
  
        if (confirmation.isConfirmed) {
          await dispatch(userActions.delete_users(datitos));
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario eliminado',
            showConfirmButton: dispatch(userActions.read_users()),
            timer: 1500,
          });
      
      } }else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se eliminó',
          timer: 1500,
        });
      }
    } catch (error) {
      console.log('Error al eliminar usuario:', error);
    }
  }

  function captureSelect() {
    setSelectUser(inputSelectUser.current.value.trim());
  }
  return (
    <div className='w-full h-[90vh] bg-[url("https://static.vecteezy.com/system/resources/previews/002/848/473/non_2x/modern-white-background-with-shiny-gold-geometric-element-abstract-light-clean-silver-background-vector.jpg")] bg-cover'>
    <div className='w-full h-[10vh] flex justify-center items-center gap-2'>
    <p className='text-[1.5rem] font-semibold'>Elimina un Usuario</p>
    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
    <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
  </svg>
    </div>
    <div className=' w-full h-[35vh] flex flex-col justify-center items-center gap-5'>
    <p className='text-[1.4rem]'>Selecciona el usuario</p>
    <select  onChange={captureSelect}
          ref={inputSelectUser}
          value={selectUser} className='lg:w-[25%] w-[60%] sm:w-[40%] py-[0.5rem] px-[0.5rem] boder-solid border-[1px] border-black'>
    <option value="">Usuarios</option>
    {Array.isArray(usuarios) && usuarios.length > 0 ? (
            usuarios.map((user) => (
              <option key={user._id} value={user.usuario}>
                {user.usuario}
              </option>
            ))
          ) : (
            <option value='' disabled>
              Loading users...
            </option>
          )}
    </select>
    </div>
    <div className='w-full h-[45vh]  flex justify-center items-start'>
    <button onClick={deleteUser} className='lg:w-[20%] w-[50%] sm:w-[30%] bg-[#17103a] py-[0.5rem] px-[1rem] text-white rounded-[10px]'>Eliminar Usuario</button>
    </div> 
    </div>
  );
}
