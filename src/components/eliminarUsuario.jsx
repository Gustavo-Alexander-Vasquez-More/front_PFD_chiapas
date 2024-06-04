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
    <div className='w-full py-[1rem] h-auto min-h-[90vh] flex justify-center items-center bg-[url("https://media.gq.com.mx/photos/5d503b24e640cd0009a4511a/16:9/w_2560%2Cc_limit/GettyImages-537315513.jpg")] bg-cover'>
    <div className='flex flex-col gap-5 items-center lg:w-[50%] w-[95%] h-auto px-[2rem] py-[1rem] bg-[#ffffffbb] rounded-[10px]'>
    <div className='w-full h-auto flex justify-center items-center gap-2'>
    <p className='text-[1.5rem] underline font-semibold'>Elimina un Usuario</p>
    </div>
    <div className=' w-full h-auto flex flex-col justify-center items-center gap-5'>
    <p className='text-[1.2rem]'>Selecciona el usuario</p>
    <select  onChange={captureSelect}
          ref={inputSelectUser}
          value={selectUser} className='w-full py-[0.5rem] px-[0.5rem] boder-solid border-[1px] border-black'>
    <option value="">Selecciona</option>
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
    <div className='w-full h-auto  flex justify-center items-start'>
    <button onClick={deleteUser} className=' lg:w-[50%] w-full bg-[#17103a] py-[0.5rem] px-[1rem] font-semibold text-white rounded-[10px]'>Eliminar Usuario</button>
    </div> 
    </div>
    </div>
  );
}
