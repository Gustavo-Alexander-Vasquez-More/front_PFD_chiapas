import React, { useEffect, useState} from 'react';
import { Link as Anchor, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import userActions from '../redux/actions/userActions';
import NavBar from '../components/Navbar.jsx';

function useUserRoleVerification(usersLoaded, userss, Admin, usuario, LogOut) {
  useEffect(() => {
    if (usersLoaded && Array.isArray(userss)) {
      const userFilter = userss.find((user) => user?.usuario === usuario) || [];
      const rolFilter = userFilter?.rol;

      if (parseInt(Admin) !== rolFilter) {
        LogOut();
        
      }
    }
  }, [usersLoaded, userss, Admin, usuario, LogOut]);
}
export default function panelAdmin() {
const [usersLoaded, setUsersLoaded] = useState(false);
const dispatch = useDispatch();
const Admin = localStorage.getItem('rol');
const userss = useSelector((store) => store?.users?.users);
const token=localStorage.getItem('token')
const user=localStorage.getItem('usuario')
const navigate=useNavigate()
useEffect(() => {
  dispatch(userActions.read_users())
    .then(() => {
      setUsersLoaded(true);
    })
    .catch((error) => {
      console.error('Error al cargar usuarios:', error);
    });
}, [dispatch]);


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
      title: 'Error de credenciales, se cerró su sesión.. ingrese nuevamente',
      showConfirmButton: false,
      timer: 1500,
    });
    await new Promise(resolve => setTimeout(resolve, 1000))
    navigate('/');
    } catch (error) {
       console.log(error);
      }
    }; 


const usuario = localStorage.getItem('usuario');
  useUserRoleVerification(usersLoaded, userss, Admin, usuario, LogOut);
const rol= localStorage.getItem('rol')
const numberRol=parseInt(rol)

return (
<>
<NavBar/>
<div className='w-full flex justify-center items-center h-[90vh] bg-[url("https://cdn.britannica.com/37/178937-050-21CBC6F1/Palenque-Temple-of-the-Inscriptions-Chiapas-Mexico.jpg")] bg-center bg-cover'>
      <div className='flex flex-col justify-center items-center bg-[#ffffff93] px-[2rem] rounded-[5px] py-[2rem]'>
        <p className='lg:text-[2rem] text-[1.5rem]'>Antecedentes Penales</p>
      <img className='w-[10rem]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Coat_of_arms_of_Chiapas.svg/320px-Coat_of_arms_of_Chiapas.svg.png" alt="" />
      <p className='lg:text-[2rem] text-[1.5rem]'>Chiapas</p>
      </div>
    </div>
</>

);
}
