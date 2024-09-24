import React, { useEffect, useRef, useState } from 'react';
import adminActions from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
export default function registro_folios() {
const dispatch=useDispatch()

const [select_user, setSelect_user]=useState()
const [currentPage, setCurrentPage] = useState(
  parseInt(localStorage.getItem('pagina')) || 1 //le digo que mi estado inicial sea 1 o que sea el numero almacenado en el local storage
);
useEffect(() => {
  dispatch(adminActions.read_users())
  dispatch(adminActions.read_folios_creados(currentPage))
  }, [dispatch]);

const input_select=useRef()
const admins=useSelector(store=>store.users.users)
const read_folios_creados=useSelector(store=>store.users.read_folios_creados)
console.log(read_folios_creados);
const read_folios_response=read_folios_creados.response
const folios_creados_filter=Array.isArray(read_folios_response) ? read_folios_response.filter(adm=>adm.usuario_admin === select_user):[]
const admins_filter=Array.isArray(admins) ? admins.filter(adm=>adm.rol === 1 || adm.rol === 4) : []

const capture_select=()=>{
setSelect_user(input_select.current.value)
}
function handleNext() {
  const nextPage = currentPage + 1;
  const hasNextPage = read_folios_creados?.nextPage;

  if (hasNextPage) {
    dispatch(adminActions.read_folios_creados(nextPage)).then(() => {
      setCurrentPage(nextPage);
    });
  } else {
    // Manejar el caso en el que no hay una página siguiente
    console.log('No hay más datos en la página siguiente.');
  }
}
function handlePrev() {
  if (currentPage > 1) {
    const prevPage = currentPage - 1;
    dispatch(adminActions.read_folios_creados(prevPage)).then(() => {
      setCurrentPage(prevPage);
    });
  } else {
    // Manejar el caso en el que no hay una página anterior
    console.log('No hay más datos en la página anterior.');
  }
}
return (
<>
<div className='w-full h-auto min-h-[90vh] flex justify-center items-center py-[1rem]  bg-[url("https://cdn.britannica.com/37/178937-050-21CBC6F1/Palenque-Temple-of-the-Inscriptions-Chiapas-Mexico.jpg")] bg-cover bg-no-repeat  bg-black bg-center'>
<div className='flex flex-col w-[90%] lg:w-[40%] h-auto bg-[white] rounded-[10px]'>
  <div className='w-full flex justify-center border-b-[2px] border-b-[black] border-solid items-center py-[1rem]'>
    <p className='font-semibold text-[1.4rem] text-center'>Registro de asignación de folios</p>
  </div>
  <div className='flex flex-col items-center px-[1rem] gap-2 py-[1rem]'>
    <p>Cuentas con permiso de asignar folios:</p>
    <select ref={input_select} onChange={capture_select} class="form-select" aria-label="Default select example">
      <option selected>Elija una opción</option>
      {admins_filter.map(adm=>(
        <option value={adm.usuario}>{adm.usuario}</option>
      ))}
    </select>
    <div id="emailHelp" class="form-text">Seleccione un admin o revendedor para ver su historial de asignacion de folios.</div>
    {select_user && folios_creados_filter.length > 0 && (
      <div className='py-[1rem] w-full flex flex-col gap-4'>
        {folios_creados_filter?.map(adm=>(
          <table className='table-auto w-full'>
          <thead>
            <tr className='text-center'>
              <th className='border px-4 py-2' colSpan="2">Asignaciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border px-4 py-2'>Nombre de usuario:</td>
              <td className='border px-4 py-2'>{adm.usuario_cliente}</td>
            </tr>
            <tr>
              <td className='border px-4 py-2'>Folios asignados:</td>
              <td className='border px-4 py-2'>{adm.folios}</td>
            </tr>
            <tr>
              <td className='border px-4 py-2'>Fecha de asignación:</td>
              <td className='border px-4 py-2'>{adm.fecha}</td>
            </tr>
            <tr>
              <td className='border px-4 py-2'>Hora de asignación:</td>
              <td className='border px-4 py-2'>{adm.horario} Hrs.</td>
            </tr>
          </tbody>
        </table>
        ))}
        <div className='w-full h-[6vh] pt-[2rem] flex justify-center gap-2 items-center'>
        <button  onClick={handlePrev}
        disabled={read_folios_creados?.prevPage === null} className='bg-[#1db9b9] text-white p-1 rounded-[10px] disabled:bg-[gray]'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
      </svg></button>
        <p>Página: {currentPage}</p>
        <button  onClick={handleNext}
          disabled={ read_folios_creados?.nextPage === null} className='bg-[#1db9b9] text-[white] p-1 rounded-[10px] disabled:bg-[gray]'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
        </svg></button>
          </div>
      </div>
      
    )}
    {select_user && folios_creados_filter.length === 0 && (
      <p>Historial de usuario vacío.</p>
    )}
  </div>
</div>
</div>
</>
  );
}
