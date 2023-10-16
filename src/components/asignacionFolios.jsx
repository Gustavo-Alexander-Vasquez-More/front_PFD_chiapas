import React, { useEffect, useRef, useState } from 'react';
import userActions from '../redux/actions/userActions.js';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

export default function AsignacionFolios() {
    const [selectUser, setSelectUser] = useState('');
    const [addFolioValue, setAddFolioValue] = useState('');
    const dispatch = useDispatch();
    const inputSelectUser = useRef();
    const AgregarFolio = useRef();
   
  
    useEffect(() => {
      dispatch(userActions?.read_users());
    }, [dispatch]);
    const usuarios = useSelector((store) => store.users.users);
    const captureSelect = () => {
      setSelectUser(inputSelectUser.current.value.trim());
    };
  
    function capturarValorFolios() {
      setAddFolioValue(AgregarFolio.current.value.trim());
    }
  
    async function agregarMasFolios() {
      try {
        const adminToUpdate = usuarios?.find((admin) => admin.usuario === selectUser);
        if (!adminToUpdate) {
          throw new Error('No se encontró el usuario');
        }
  
        const foliosToAdd = parseInt(addFolioValue, 10);
        if (isNaN(foliosToAdd) || foliosToAdd <= 0) {
          throw new Error('La cantidad de folios a agregar debe ser un número positivo');
        }
  
        const updatedFolios = adminToUpdate.folios + foliosToAdd;
  
        const payload = {
          usuario: selectUser,
          folios: updatedFolios,
        };
  
        await dispatch(userActions.update_users(payload));
        dispatch(userActions?.read_users());
  
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Folios agregados con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
  
        setSelectUser('');
        setAddFolioValue('');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    }
  
    const usuarioSeleccionado = Array.isArray(usuarios)
      ? usuarios?.filter((usuario) => usuario.usuario === selectUser)
      : [];
  
  return (
    <div className="w-full h-[90vh] bg-[url('https://static.vecteezy.com/system/resources/previews/002/848/473/non_2x/modern-white-background-with-shiny-gold-geometric-element-abstract-light-clean-silver-background-vector.jpg')] bg-cover">
      <div className="w-full h-[15vh] flex justify-center items-center gap-3">
        <p className="sm:text-[1.5rem] text-[1rem] font-semibold">Añade folios a tus empleados</p>
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
        </svg>
      </div>
      <div className="w-full h-[15vh] flex flex-col justify-center items-center gap-5 ">
        <p className="text-[1.4rem]">Selecciona el usuario</p>
        <select
          onChange={captureSelect}
          ref={inputSelectUser}
          value={selectUser}
          className="lg:w-[25%] w-[70%] sm:w-[35%] py-[0.5rem] px-[0.5rem] border-solid border-[1px] border-black"
        >
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
      {selectUser && (
        <div className="w-full h-[30vh] flex flex-col items-center justify-around">
          {usuarioSeleccionado?.map((user) => (
            <p className='font-semibold' key={user._id}>Este usuario tiene actualmente: {user.folios} folios.</p>
          ))}
          <p className='sm:text-[1.2rem] text-[1rem]'>Cuantos folios quieres agregarle?</p>
          <input ref={AgregarFolio} onChange={capturarValorFolios} className='border-solid border-[1px] border-black rounded-[5px] py-[0.3rem] px-[0.5rem] lg:w-[25%] w-[70%] sm:w-[35%]' placeholder='Escribe un numero' type="number" />
          <div className='w-full h-[10vh]  flex justify-center items-center'>
        <button onClick={agregarMasFolios} className='lg:w-[15%] w-[50%] sm:w-[35%] px-[1rem] py-[0.5rem] bg-[#17103a] text-white rounded-[15px]'>Agregar!</button>
      </div>
        </div>
      
      )}
      
    </div>
  );
}
