import React, { useEffect, useRef, useState } from 'react';
import antecedentesActions from '../redux/actions/antecedentesActions.js'
import userActions from '../redux/actions/userActions.js';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import QRCode from 'qrcode.react'; 
import { useNavigate } from 'react-router-dom';

export default function crearAltas() {
const [foto, setFoto]=useState('')
 const [loading, setLoading] = useState(false);

console.log(foto);
const [huella, setHuella]=useState('')
console.log(huella);
const [qr, setQr]=useState('')
const[qrVisualizer, setQrVisualizer]=useState('')
console.log(qr);
const [nombre, setNombre]=useState('')
const inputFoto=useRef()
const inputHuella=useRef()
const inputNombre=useRef()
const navigate=useNavigate()
const dispatch=useDispatch()
useEffect(() => {
  dispatch(antecedentesActions.read_AllAntecedentes())
  }, [dispatch]);
  useEffect(() => {
    dispatch(userActions.read_users())
    }, [dispatch]);
  const antecedentes=useSelector((store)=>store.antecedentes?.AllAntecedentes)
  const users=useSelector((store)=>store.users.users)
  const usuarioo=localStorage.getItem('usuario')
  const userFilter = Array.isArray(users) ? users.filter(usuario => usuario?.usuario === usuarioo) : [];

  // Resto del código
  
  console.log(userFilter);
  const foliosUser=userFilter?.map(user=> user.folios)
  console.log(foliosUser);
function captureNombre(){
  setNombre(inputNombre.current.value)
}
const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  month = month < 10 ? `0${month}` : `${month}`;
  const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : `${currentDate.getDate()}`;

  return `${year}-${month}-${day}`;
};
function getHours(){
  const currentDate = new Date();
  const hour=currentDate.getHours()
  const minute=currentDate.getMinutes()
  return `${hour}:${minute}`
}
const [hora, setHora] = useState(getHours());
console.log(hora);
const [expedicion, setExpedicion] = useState(getCurrentDate());
console.log(expedicion);
const calculateVigencia = (expedicionDate) => {
  const expedicion = new Date(expedicionDate);
 
  // Añadir 3 meses
  const vigencia = new Date(expedicion.getFullYear(), expedicion.getMonth() + 6, expedicion.getDate()+1);

  // Formatear la fecha para que tenga el formato YYYY-MM-DD
  const year = vigencia.getFullYear();
  const month = (vigencia.getMonth() + 1).toString().padStart(2, '0');
  const day = vigencia.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};
const vigenciaDate = calculateVigencia(expedicion);
const obtenerNuevoFolio = () => {
  const ultimoFolio = Array.isArray(antecedentes)
      ? antecedentes.reduce((maxFolio, antecedente) => {
          const antecedenteFolio = parseInt(antecedente.folio, 10);
          return antecedenteFolio > maxFolio ? antecedenteFolio : maxFolio;
      }, 0)
      : 0;

  const nuevoFolio = ultimoFolio + 1;

  return nuevoFolio.toString().padStart(7, '0');
};
const [folio, setFolio] = useState(obtenerNuevoFolio());
useEffect(() => {
  const nuevoFolio = obtenerNuevoFolio();
  setFolio(nuevoFolio);
}, [antecedentes]); 
const generateQR = () => {
  const link = `https://poderjudicialchiapas.org/validacionAntecedente/${folio}`;
  const qrDataURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}`;

  fetch(qrDataURL)
    .then(response => response.blob())
    .then(blob => {
      // Crear un objeto File a partir del Blob
      const qrImageFile = new File([blob], 'qr.png', { type: 'image/png' });

      // Almacenar la imagen del QR en el estado
      setQr(qrImageFile);
      console.log('Imagen del QR:', qrImageFile);
    })
    .catch(error => {
      console.error('Error al generar el QR:', error);
    });
};
const autor=localStorage.getItem('usuario')

async function crearAltas() {
  try {
    if (!nombre || !foto || !qr) {
      Swal.fire({
        icon: 'error',
        title: 'Completa todos los campos',
        text: 'Asegúrate de completar los campos obligatorios y generar el QR.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('foto', foto);
    formData.append('huella', huella);
    formData.append('qr', qr);
    formData.append('folio', folio);
    formData.append('expedicion', expedicion);
    formData.append('vigencia', vigenciaDate);
    formData.append('author_id', autor);
    formData.append('hora', hora);

    const rolUsuario = parseInt(localStorage.getItem('rol'));
    const tieneFoliosSuficientes = foliosUser > 0 || rolUsuario === 1 || rolUsuario === 2;

    if (tieneFoliosSuficientes) {
      if (rolUsuario !== 1 && rolUsuario !== 2) {
        const nuevaCantidadDeFolio = foliosUser - 1;
        localStorage.setItem('folios', nuevaCantidadDeFolio.toString());
      }
await dispatch(antecedentesActions.create_antecedentes(formData));
Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Antecedente creado',
          showConfirmButton: false,
          timer: 1500
        });

        navigate(`/consultaPDF/${folio}`);

        if (rolUsuario !== 1 && rolUsuario !== 2) {
          const nuevaCantidadDeFolio = foliosUser - 1;
          const nombre = localStorage.getItem('usuario');
          const payload = {
            usuario: nombre,
            folios: nuevaCantidadDeFolio,
          };

          await dispatch(userActions.update_users(payload));
        }
} else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '¡Para seguir agregando licencias pide más folios!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.error('Error al crear antecedente:', error);
    setLoading(false); // Asegúrate de desactivar el indicador de carga en caso de error
  }
}
const rol=localStorage.getItem('rol')
const numbRol=parseInt(rol)
  return (
    <div className='w-full h-[90vh] '>
      <div className='w-full h-[20vh]  flex flex-col justify-center items-center'>
        <p className='text-[2.5rem]'>Crea tus altas</p>
        {numbRol !==1 && (
          <p>Te quedan {foliosUser} folios por usar</p>
        )}
        
      </div>
      <div className='flex sm:flex-row flex-col items-center sm:items-start'>
        <div className='sm:w-[50%] sm:h-[45vh]  h-auto flex flex-col gap-4  w-[80%]'>
          <div className='w-full h-auto flex flex-col lg:px-[3rem] xl:px-[5rem] sm:px-[1rem] '>
            <p>Nombre:</p>
            <input
              ref={inputNombre}
              onChange={captureNombre}
              className='xl:w-[40%] lg:w-[60%] sm:w-[60%] py-[0.3rem] px-[0.5rem] rounded-[5px] border-solid border-[1px] border-gray-500'
              type='text'
            />
          </div>
          <div className='w-full h-auto flex flex-col lg:px-[3rem] xl:px-[5rem] sm:px-[1rem]'>
            <p>Foto:</p>
            <input
    ref={inputFoto}
    onChange={() => setFoto(inputFoto.current.files[0])}
    className='xl:w-[40%] lg:w-[60%] sm:w-[60%] py-[0.3rem]'
    type='file' name="foto"
  />
          </div>
          {foto && (
            <div className='w-full h-auto flex flex-col lg:px-[3rem] xl:px-[5rem] sm:px-[1rem] gap-4'>
              <p>Folio</p>
              
              <input
                value='0000842'
                className='xl:w-[20%] lg:w-[40%] sm:w-[40%] py-[0.3rem] px-[0.5rem] rounded-[5px] border-solid border-[1px] border-gray-500'
                type='number'
              />
              <div className='flex gap-5 sm:mb-0 mb-[2rem]'>
                <button onClick={generateQR} className='xl:w-[20%] lg:w-[30%] sm:w-[25%] h-[5vh] bg-[#17103a] text-white py-[0.3rem] rounded-[5px]'>
                  Generar QR
                </button>
                {qr && <QRCode  size={80} value={`http://localhost:5174/validacionAntecedente/${folio}`} />}
              </div>
            </div>
          )}
        </div>
        <div className='sm:w-[50%] sm:h-[45vh] h-auto  flex flex-col gap-4 w-[80%]'>
          <div className='w-full h-auto flex flex-col sm:px-[5rem] '>
            <p>Huella:</p>
            <input ref={inputHuella} name="huella" className='xl:w-[40%] lg:w-[60%] w-full py-[0.3rem]' type='file' onChange={() => setHuella(inputHuella.current.files[0])} />
          </div>
          <div className='w-full h-auto flex flex-col sm:px-[5rem] '>
            <p>Expedición</p>
            <input
              value={expedicion}
              className='xl:w-[40%] lg:w-[60%] py-[0.3rem] px-[0.5rem] w-full  rounded-[5px] border-solid border-[1px] border-gray-500'
              type='text'
            />
          </div>
          <div className='w-full h-auto flex flex-col sm:px-[5rem]'>
            <p>Vigencia</p>
            <input
              value={vigenciaDate}
              className='xl:w-[40%] lg:w-[60%] py-[0.3rem] px-[0.5rem] w-full rounded-[5px] border-solid border-[1px] border-gray-500'
              type='text'
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[10vh] flex justify-center items-center">
        <button onClick={crearAltas} className="xl:w-[15%] lg:w-[30%] px-[1rem] py-[0.5rem] bg-[#17103a] text-white rounded-[10px]">
          {loading ? 'Creando...' : 'Crear Antecedente'}
        </button>
      </div>
    </div>
  );
}
