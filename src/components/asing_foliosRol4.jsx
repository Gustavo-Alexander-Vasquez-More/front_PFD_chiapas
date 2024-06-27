import React, { useEffect, useRef, useState } from 'react';
import userActions from '../redux/actions/userActions.js';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
export default function asing_foliosRol4() {
    const [selectUser, setSelectUser] = useState('');
    const [addFolioValue, setAddFolioValue] = useState('');
    const dispatch = useDispatch();
    const inputSelectUser = useRef();
    const AgregarFolio = useRef();
   
  
    useEffect(() => {
      dispatch(userActions?.read_users());
    }, [dispatch]);
    const usuarios = useSelector((store) => store.users.users);
    const usuario_here= Array.isArray(usuarios) ? usuarios?.filter(admin=>admin.usuario === localStorage.getItem('usuario')): []
    const cantidadFolios=parseInt(usuario_here.map(admin=>admin.folios))
    const usuarioFiltered = Array.isArray(usuarios) ? usuarios.filter(admin => admin.rol === 3 && admin.creador === localStorage.getItem('usuario')) : [];
    const captureSelect = () => {
      setSelectUser(inputSelectUser.current.value.trim());
    };
  
    function capturarValorFolios() {
      setAddFolioValue(AgregarFolio.current.value.trim());
    }
    async function disminuirFoliosRevendedor(){
        try {
            const payload = {
                usuario: localStorage.getItem('usuario'),
                folios: cantidadFolios - parseInt(addFolioValue),
            };
              await dispatch(userActions.update_users(payload));
            } catch (error) {
            
        }
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
        if(cantidadFolios === 0){
            Swal.fire('Necesitas más folios para poder asignarle a tus usuarios, pídele mas a tu proovedor.')
        }
        if(cantidadFolios > 0){
        if(addFolioValue <= cantidadFolios){
        await dispatch(userActions.update_users(payload));
        await disminuirFoliosRevendedor()
        dispatch(userActions?.read_users());
        setSelectUser('');
        setAddFolioValue('');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Folios agregados con éxito',
          showConfirmButton: false,
          timer: 1500,
        })
    }
        if(addFolioValue > cantidadFolios){
            Swal.fire('No puedes asignar esta cantidad ya que no cuentas con los folios suficientes!.')
        
    }}
        
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
    <div className="w-full flex justify-center items-center h-auto py-[1rem] min-h-[90vh] bg-[url('https://cdn.britannica.com/37/178937-050-21CBC6F1/Palenque-Temple-of-the-Inscriptions-Chiapas-Mexico.jpg')] bg-cover bg-no-repeat">
    <div className='flex flex-col lg:w-[50%] w-[95%] gap-5 bg-[#ffffffa9] rounded-[10px] py-[1rem] px-[2rem]'>
    <div className="w-full h-auto flex justify-center items-center gap-3">
      <p className="sm:text-[1.5rem] text-[1rem] font-semibold">Añade folios a tus empleados</p>
    </div>
    <p className='font-semibold text-center'>Actualmente tienes {cantidadFolios} folios.</p>
    <div className="w-full h-auto flex flex-col justify-center items-center gap-5 ">
      <p className="text-[1.4rem]">Selecciona el usuario</p>
      <select
        onChange={captureSelect}
        ref={inputSelectUser}
        value={selectUser}
        className="w-full py-[0.5rem] px-[0.5rem] border-solid border-[1px] border-black"
      >
        <option value="">Usuarios</option>
        {Array.isArray(usuarioFiltered) ? usuarioFiltered?.map(admin=>(
    <option value={admin.usuario}>{admin.usuario}</option>
    )):[]}
      </select>
    </div>
    {selectUser && (
    <div className="w-full h-[30vh] flex flex-col items-center justify-around">
    {usuarioSeleccionado?.map((user) => (
    <p className='font-semibold' key={user._id}> El usuario {user.usuario} tiene {user.folios || 0} folios</p>
    ))}
        <p className='sm:text-[1.2rem] text-[1rem]'>Cuantos folios quieres agregarle?</p>
        <input ref={AgregarFolio} onChange={capturarValorFolios} className='border-solid border-[1px] border-black rounded-[5px] py-[0.3rem] px-[0.5rem] w-full' placeholder='Escribe un numero' type="number" />
        <div className='w-full h-auto  flex justify-center items-center'>
      <button onClick={agregarMasFolios} className='lg:w-[15%] w-[50%] sm:w-[35%] px-[1rem] py-[0.5rem] bg-[#8d3044] text-white rounded-[15px]'>Agregar!</button>
    </div>
      </div>
    
    )}
    </div>  
  </div>
  );
}
