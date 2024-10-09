import React, { useEffect, useRef, useState } from 'react';
import userActions from '../redux/actions/userActions.js'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './Navbar.jsx';

export default function deleteAdminsRol4() {
    const [selectUser, setSelectUser] = useState('');
  const dispatch = useDispatch();
  const inputSelectUser = useRef();
  
  
  useEffect(() => {
    dispatch(userActions?.read_users());
  }, [dispatch]);
  const usuarios = useSelector((store) => store?.users?.users);
  const usuariosFilter=Array.isArray (usuarios) ? usuarios.filter(admin=>admin.creador === localStorage.getItem('usuario')) : []
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
   <>
   <NavBar/>
   <div className='w-full flex justify-center items-center h-auto py-[1rem] min-h-[90vh] bg-[url("https://cdn.britannica.com/37/178937-050-21CBC6F1/Palenque-Temple-of-the-Inscriptions-Chiapas-Mexico.jpg")] bg-cover bg-no-repeat'>
      <div className='flex flex-col lg:w-[50%] w-[95%] gap-5 bg-[#ffffffa9] rounded-[10px] py-[1rem] px-[2rem]'>
      <div className='w-full h-auto flex justify-center items-center gap-2'>
    <p className='text-[1.5rem] font-semibold'>Elimina un Usuario</p>
  </div>
    <div className=' w-full h-auto flex flex-col justify-center items-center gap-5'>
    <p className='text-[1.4rem]'>Selecciona el usuario</p>
    <select  onChange={captureSelect}
          ref={inputSelectUser}
          value={selectUser} className='w-full py-[0.5rem] px-[0.5rem] boder-solid border-[1px] border-black'>
    <option value="">Usuarios</option>
    {Array.isArray(usuarios) && usuarios.length > 0 ? (
            usuariosFilter.map((user) => (
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
    <button onClick={deleteUser} className='w-full sm:w-[30%] bg-[#21349e] py-[0.5rem] px-[1rem] text-white rounded-[10px]'>Eliminar Usuario</button>
    </div>
      </div>
    </div>
   </>
  );
}