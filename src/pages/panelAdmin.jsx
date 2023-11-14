import React, { useEffect, useState } from 'react';
import { Link as Anchor, useNavigate } from 'react-router-dom';
import CrearUsuario from '../components/crearUsuario';
import EliminarUsuario from '../components/eliminarUsuario';
import AsignacionFolios from '../components/asignacionFolios';
import CrearAltas from '../components/crearAltas';
import AdmiAltas from '../components/admiAltas';
import AdmiAltasrol3 from '../components/admiAltasrol3';
import Connecion from '../components/coneccion'
import axios from 'axios';
import Swal from 'sweetalert2';
export default function panelAdmin() {
const [menu, setMenu] = useState(false);
const [mostrarModal, setMostrarModal]=useState(false)
const [opcionSelect, setOpcionSelect]=useState(null)
const token=localStorage.getItem('token')
const user=localStorage.getItem('usuario')
const navigate=useNavigate()
function openModal(opcion){
setOpcionSelect(opcion)
setMostrarModal(true)
setMenu(false)
}
function openMenu() {
setMenu(true);
}
function closeMenu() {
setMenu(false);
}
useEffect(() => {
const userToken = localStorage.getItem('token');
  
  if (!userToken) {
  navigate('/');
  }
  }, [navigate]);
async function LogOut() {

  try {
    await axios.post('https://backpdfchiapas-production.up.railway.app/api/admins/logout', null, {
      headers: { Authorization: `Bearer ${token}` },
    });
localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    localStorage.removeItem('folios')
    localStorage.removeItem('pagina')
    localStorage.removeItem('folioEdit')
  Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Hasta luego!',
      showConfirmButton: false,
      timer: 1500,
    });

await new Promise(resolve => setTimeout(resolve, 1000))
navigate('/');
} catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se cerro la sesion correctamente',
      timer: 1500,
    });
  }
};

const rol= localStorage.getItem('rol')
const numberRol=parseInt(rol)


return (
<div className='w-full h-full'>
    <div className={`absolute bg-[#17103a] lg:w-[30%] w-[60%] h-full py-[2rem] lg:px-[2rem] px-[1.3rem] flex flex-col gap-10 items-start transition-transform ${menu ? 'translate-x-0' : '-translate-x-full'}`}>
        <Anchor onClick={closeMenu}>
        <svg className="w-6 h-6 text-[white] hover:animate-spin" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>  
        </Anchor>
        { numberRol === 1 && (
          <>
          
          <div className='flex gap-5'>
          <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 8h6m-3 3V5m-6-.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
          </svg>
          <button className='hover:text-[#370080] text-white lg:text-[1rem] text-[0.8rem]' onClick={()=>openModal('opcion1')}>Crear Usuario</button>
          </div>
          <div className='flex gap-5'>
          <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 8h6m-9-3.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
          </svg>
          <button className='hover:text-[#370080] text-white lg:text-[1rem] text-[0.8rem]' onClick={()=>openModal('opcion2')}>Eliminar Usuario</button>
          </div>
          <div className='flex gap-5'>
          <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white dark:text-white" aria-hidden="true" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 8C5.80777 8 5.13108 7.79473 4.55551 7.41015C3.97993 7.02556 3.53133 6.47893 3.26642 5.83939C3.00152 5.19985 2.9322 4.49612 3.06725 3.81719C3.2023 3.13825 3.53564 2.51461 4.02513 2.02513C4.51461 1.53564 5.13825 1.2023 5.81719 1.06725C6.49612 0.932205 7.19985 1.00152 7.83939 1.26642C8.47893 1.53133 9.02556 1.97993 9.41015 2.55551C9.79473 3.13108 10 3.80777 10 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.5 17H1V15C1 13.9391 1.42143 12.9217 2.17157 12.1716C2.92172 11.4214 3.93913 11 5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19.5 11H18.38C18.2672 10.5081 18.0714 10.0391 17.801 9.613L18.601 8.818C18.6947 8.72424 18.7474 8.59708 18.7474 8.4645C18.7474 8.33192 18.6947 8.20476 18.601 8.111L17.894 7.404C17.8002 7.31026 17.6731 7.25761 17.5405 7.25761C17.4079 7.25761 17.2808 7.31026 17.187 7.404L16.392 8.204C15.9647 7.93136 15.4939 7.73384 15 7.62V6.5C15 6.36739 14.9473 6.24021 14.8536 6.14645C14.7598 6.05268 14.6326 6 14.5 6H13.5C13.3674 6 13.2402 6.05268 13.1464 6.14645C13.0527 6.24021 13 6.36739 13 6.5V7.62C12.5081 7.73283 12.0391 7.92863 11.613 8.199L10.818 7.404C10.7242 7.31026 10.5971 7.25761 10.4645 7.25761C10.3319 7.25761 10.2048 7.31026 10.111 7.404L9.404 8.111C9.31026 8.20476 9.25761 8.33192 9.25761 8.4645C9.25761 8.59708 9.31026 8.72424 9.404 8.818L10.204 9.618C9.9324 10.0422 9.73492 10.5096 9.62 11H8.5C8.36739 11 8.24021 11.0527 8.14645 11.1464C8.05268 11.2402 8 11.3674 8 11.5V12.5C8 12.6326 8.05268 12.7598 8.14645 12.8536C8.24021 12.9473 8.36739 13 8.5 13H9.62C9.73283 13.4919 9.92863 13.9609 10.199 14.387L9.404 15.182C9.31026 15.2758 9.25761 15.4029 9.25761 15.5355C9.25761 15.6681 9.31026 15.7952 9.404 15.889L10.111 16.596C10.2048 16.6897 10.3319 16.7424 10.4645 16.7424C10.5971 16.7424 10.7242 16.6897 10.818 16.596L11.618 15.796C12.0422 16.0676 12.5096 16.2651 13 16.38V17.5C13 17.6326 13.0527 17.7598 13.1464 17.8536C13.2402 17.9473 13.3674 18 13.5 18H14.5C14.6326 18 14.7598 17.9473 14.8536 17.8536C14.9473 17.7598 15 17.6326 15 17.5V16.38C15.4919 16.2672 15.9609 16.0714 16.387 15.801L17.182 16.601C17.2758 16.6947 17.4029 16.7474 17.5355 16.7474C17.6681 16.7474 17.7952 16.6947 17.889 16.601L18.596 15.894C18.6897 15.8002 18.7424 15.6731 18.7424 15.5405C18.7424 15.4079 18.6897 15.2808 18.596 15.187L17.796 14.392C18.0686 13.9647 18.2662 13.4939 18.38 13H19.5C19.6326 13 19.7598 12.9473 19.8536 12.8536C19.9473 12.7598 20 12.6326 20 12.5V11.5C20 11.3674 19.9473 11.2402 19.8536 11.1464C19.7598 11.0527 19.6326 11 19.5 11ZM14 14.5C13.5055 14.5 13.0222 14.3534 12.6111 14.0787C12.2 13.804 11.8795 13.4135 11.6903 12.9567C11.5011 12.4999 11.4516 11.9972 11.548 11.5123C11.6445 11.0273 11.8826 10.5819 12.2322 10.2322C12.5819 9.8826 13.0273 9.6445 13.5123 9.54804C13.9972 9.45157 14.4999 9.50108 14.9567 9.6903C15.4135 9.87952 15.804 10.2 16.0787 10.6111C16.3534 11.0222 16.5 11.5055 16.5 12C16.5 12.663 16.2366 13.2989 15.7678 13.7678C15.2989 14.2366 14.663 14.5 14 14.5Z" fill="currentColor"/>
          </svg>
          <button className='hover:text-[#370080] text-white lg:text-[1rem] text-[0.8rem]' onClick={()=>openModal('opcion3')}>Asignación de folios</button>
          </div>
          <div className='flex gap-5'>
          <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
          </svg>
          <button className='hover:text-[#370080] text-white lg:text-[1rem] text-[0.8rem]' onClick={()=>openModal('opcion4')}>Subir Altas</button>
          </div>
          <div className='flex gap-5'>
          <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
          </svg>
          <button className='hover:text-[#370080] text-white lg:text-[1rem] text-[0.8rem]' onClick={()=>openModal('opcion5')}>Administrar Altas</button>
          </div>

          <div className='flex gap-5'>
          <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
          </svg>
          <button  className='hover:text-[#370080] text-white lg:text-[1rem] text-[0.8rem]' onClick={()=>openModal('opcion7')}>Usuarios conectados</button>
          </div>

          <div className='flex gap-5'>
          <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <button  className='hover:text-[#370080] text-white lg:text-[1rem] text-[0.8rem]' onClick={LogOut}>Cerrar sesión</button>
          </div>
          
          </>
        )}
        {numberRol === 2 && (
          <>
          
          <div className='flex gap-5'>
          <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
          </svg>
          <button className='hover:text-[#370080] text-white lg:text-[1rem] text-[0.8rem]' onClick={()=>openModal('opcion4')}>Subir Altas</button>
          </div>
          <div className='flex gap-5'>
          <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
          </svg>
          <button className='hover:text-[#370080] text-white lg:text-[1rem] text-[0.8rem]' onClick={()=>openModal('opcion5')}>Administrar Altas</button>
          </div>
          <div className='flex gap-5'>
          <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <button  className='hover:text-[#370080] text-white lg:text-[1rem] text-[0.8rem]' onClick={LogOut}>Cerrar sesión</button>
          </div>
          </>
        )}
        {numberRol === 3 && (
          <>
          
          <div className='flex gap-5'>
          <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"/>
          </svg>
          <button className='hover:text-[#370080] text-white lg:text-[1rem] text-[0.8rem]' onClick={()=>openModal('opcion4')}>Subir Altas</button>
          </div>
          <div className='flex gap-5'>
          <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
          </svg>
          <button className='hover:text-[#370080] text-white lg:text-[1rem] text-[0.8rem]' onClick={()=>openModal('opcion6')}>Administrar Altas</button>
          </div>
          <div className='flex gap-5'>
          <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <button  className='hover:text-[#370080] text-white lg:text-[1rem] text-[0.8rem]' onClick={LogOut}>Cerrar sesión</button>
          </div>
          </>
        )}
    </div>
    <div className="w-full h-[10vh] flex items-center bg-[#17103a] justify-between lg:px-[2rem] px-[0.8rem] gap-3 lg:gap-0">
        <Anchor className="" onClick={openMenu}>
        <svg className="w-7 h-7 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
        </Anchor>
        <p className='lg:text-[2rem] text-[1rem] sm:text-[1.5rem] text-white'>Panel de Administrador</p>
        <div  className='flex'>
            <p className='text-white flex gap-3 lg:text-[1.3rem] text-[0.8rem]'>Hola {user}! <svg class="lg:w-6 lg:h-6 w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 18">
    <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
  </svg></p>
      </div>
    </div>
    {mostrarModal && (
      <>
      {opcionSelect === 'opcion1' && (
        <CrearUsuario/>
        )}
        {opcionSelect === 'opcion2' && (
        <EliminarUsuario/>
        )}
        {opcionSelect === 'opcion3' && (
        <AsignacionFolios/>
        )}
        {opcionSelect === 'opcion4' && (
        <CrearAltas/>
        )}
        {opcionSelect === 'opcion5' && (
        <AdmiAltas/>
        )}
        {opcionSelect === 'opcion6' && (
        <AdmiAltasrol3/>
        )}
        {opcionSelect === 'opcion7' && (
        <Connecion/>
        )}
      </>
    )}
    {!mostrarModal && (
    <div className='w-full h-[90vh] bg-[url("https://static.vecteezy.com/system/resources/previews/005/554/444/non_2x/abstract-elegant-white-and-grey-background-abstract-white-pattern-squares-texture-free-vector.jpg")] bg-cover'>
      <div className='flex flex-col items-center w-full h-[70vh] justify-around'>
        <p className='lg:text-[3rem] text-[2rem]'>Sistema de Altas</p>
        <p className='text-[1.8rem]'>Antecedentes Chiapas</p>
        <img className='w-[10rem]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Coat_of_arms_of_Chiapas.svg/320px-Coat_of_arms_of_Chiapas.svg.png" alt="" />
      </div>
    </div>
    )}
</div>

);
}
