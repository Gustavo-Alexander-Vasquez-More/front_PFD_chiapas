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
    <div className="w-full py-[1rem] h-auto min-h-[90vh] flex justify-center items-center bg-[url('https://media.gq.com.mx/photos/5d503b24e640cd0009a4511a/16:9/w_2560%2Cc_limit/GettyImages-537315513.jpg')] bg-cover">
    <div className='flex flex-col gap-5 items-center lg:w-[50%] w-[95%] h-auto px-[2rem] py-[1rem] bg-[#ffffffbb] rounded-[10px]'>
      <div className="w-full h-auto flex justify-center items-center gap-3">
        <p className="sm:text-[1.5rem] text-[1rem] font-semibold underline">Asignar folios a usuarios</p>
      </div>
      <div className="w-full h-auto flex flex-col justify-center items-center gap-5 ">
        <p className="text-[1.2rem]">Selecciona un usuario</p>
        <select
          onChange={captureSelect}
          ref={inputSelectUser}
          value={selectUser}
          className="w-full py-[0.5rem] px-[0.5rem] border-solid border-[1px] border-black"
        >
          <option value="">selecciona</option>
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
        <div className="w-full h-auto flex flex-col items-center justify-around">
          {usuarioSeleccionado?.map((user) => (
            <p className='font-semibold' key={user._id}>Este usuario tiene actualmente: {user.folios} folios.</p>
          ))}
          <p className='sm:text-[1.2rem] text-[1rem]'>Cuantos folios quieres agregarle?</p>
          <input ref={AgregarFolio} onChange={capturarValorFolios} className='border-solid border-[1px] border-black rounded-[5px] py-[0.3rem] px-[0.5rem] w-full' placeholder='Escribe un numero' type="number" />
          <div className='w-full h-[10vh]  flex justify-center items-center'>
        <button onClick={agregarMasFolios} className='w-full px-[1rem] py-[0.5rem] bg-[#17103a] text-white font-semibold rounded-[15px]'>Agregar folios</button>
      </div>
        </div>
      
      )}  
    </div>  
    </div>
  );
}
