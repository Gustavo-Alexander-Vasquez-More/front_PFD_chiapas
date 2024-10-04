import React, { useEffect, useRef, useState } from 'react';
import antecedentesActions from '../redux/actions/antecedentesActions.js'
import userActions from '../redux/actions/userActions.js';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import QRCode from 'qrcode.react'; 
import { useNavigate } from 'react-router-dom';
import {uploadFoto} from '../foto.js'
import {uploadHuella} from '../huellas.js'
import {uploadQr} from '../qr.js'
export default function crearAltas() {
const [foto, setFoto]=useState('')
console.log(foto);
 const [loading, setLoading] = useState(false);
 const [huellaLoading, setHuellaLoading] = useState(false);
 const [fotoLoading, setFotoLoading] = useState(false);
 const [fotoCargada, setFotoCargada] = useState(false);
const [archivoCargado, setArchivoCargado] = useState(false);

const [huella, setHuella]=useState('')
console.log(huella);
const [qr, setQr]=useState('')
console.log(qr);

const [nombre, setNombre]=useState('')
const inputFoto=useRef()
const inputHuella=useRef()
const inputNombre=useRef()
const navigate=useNavigate()
const dispatch=useDispatch()
useEffect(() => {
  dispatch(antecedentesActions.read_AllAntecedentes())
  }, []);
  useEffect(() => {
    dispatch(userActions.read_users())
    }, [dispatch]);

  const users=useSelector((store)=>store.users.users)
  const usuarioo=localStorage.getItem('usuario')
  const userFilter = Array.isArray(users) ? users.filter(usuario => usuario?.usuario === usuarioo) : [];
const foliosUser=userFilter?.map(user=> user.folios)
  
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

const [expedicion, setExpedicion] = useState(getCurrentDate());

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
const antecedentes=useSelector((store)=>store.antecedentes?.AllAntecedentes)
const generateQR = async (folio) => {
  console.log(folio);
  const link = `https://poderjudicialchiapas.org/validacionAntecedente/${folio}`;
  const qrDataURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}`;

  try {
    const response = await fetch(qrDataURL);
    const blob = await response.blob();
    const qrImageFile = new File([blob], 'qr.png', { type: 'image/png' });
    const qrDownloadURL = await uploadQr(qrImageFile);
    setQr(qrDownloadURL);
    console.log('QR subido a Firebase. URL de descarga:', qrDownloadURL);
  } catch (error) {
    console.error('Error al generar y subir el QR:', error);
  }
};

const [folio, setFolio] = useState('');
async function obtenerNuevoFolio() {
  try {
    const response = await dispatch(antecedentesActions.read_AllAntecedentes());
    const permisosData = response.payload;
    const ultimoPermiso = permisosData[permisosData.length - 1];
    const ultimoFolio = ultimoPermiso.folio;
    const numeroUltimoFolio = parseInt(ultimoFolio);
    const nuevoFolio = (numeroUltimoFolio + 1).toString().padStart(7, '0');
    setFolio(nuevoFolio);
    } catch (error) {
    console.log(error);
  }
}
const FileFotos = async (e) => {
  try {
    const selectedFile = e.target.files[0]; // Obtener el archivo seleccionado
    if (selectedFile) {
      setFotoLoading(true)
      const downloadURL = await uploadFoto(selectedFile); // Subir el archivo y obtener la URL de descarga
      console.log('URL de descarga:', downloadURL);
      setFoto(downloadURL);
      setFotoLoading(false)
      setFotoCargada(true); // Establecer fotoCargada en true después de cargar la foto
    }
  } catch (error) {
    console.error('Error al cargar el archivo:', error);
  }
};

const FileHuellas = async (e) => {
  try {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setHuellaLoading(true);
      const downloadURL = await uploadHuella(selectedFile);
      console.log('URL de descarga:', downloadURL);
      setHuella(downloadURL);
      setHuellaLoading(false);
      setArchivoCargado(true); // Establecer archivoCargado en true después de cargar la huella
    }
  } catch (error) {
    console.error('Error al cargar el archivo:', error);
    setHuellaLoading(false);
  }
};





function folioactual() {
  Swal.fire({
  title: 'Generando Folio ...',
  html: 'Por favor, espere mientras se genera el Folio...',
  allowOutsideClick: false,
  imageUrl:'https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/Dino_non-birthday_version.gif',
  didOpen: async () => {
    Swal.showLoading();
  try {
    
   await obtenerNuevoFolio();
  Swal.close();
  } catch (error) {
    console.log(error);
  }
}})
}



const autor=localStorage.getItem('usuario')

async function crearAltas() {
  try {
    if (!nombre || !foto) {
      Swal.fire({
        icon: 'error',
        title: 'Completa todos los campos',
        text: 'Asegúrate de completar los campos obligatorios y generar el QR.',
      });
      return;
    }
    const data={
    nombre:nombre,
    foto:foto,
    huella:huella,
    folio:folio,
    expedicion:expedicion,
    vigencia:vigenciaDate,
    author_id:autor,
    hora:hora
    }
    
    const rolUsuario = parseInt(localStorage.getItem('rol'));
    const tieneFoliosSuficientes = foliosUser > 0 || rolUsuario === 1;

    if (tieneFoliosSuficientes) {
      Swal.fire({
        title: 'Generando Antecedente...',
        allowOutsideClick: false,
        imageUrl:'https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/Dino_non-birthday_version.gif',
        didOpen: async () => {
          Swal.showLoading();
          try {
   await dispatch(antecedentesActions.create_antecedentes(data));
   await dispatch(userActions.read_users())
   window.open(`/download_pdf/${folio}`, '_blank');
      Swal.close();
    } catch (error) {
      console.error('Error al generar y subir el QR:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al generar el QR. Inténtalo nuevamente.',
      }); }
    },
  });
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
    console.log(error);
  }
}

const rol=localStorage.getItem('rol')
const numbRol=parseInt(rol)
  return (
    <div className='w-full py-[1rem] h-auto min-h-[90vh] flex justify-center items-center bg-[url("https://media.gq.com.mx/photos/5d503b24e640cd0009a4511a/16:9/w_2560%2Cc_limit/GettyImages-537315513.jpg")] bg-cover'>
      <div className='flex flex-col gap-5 items-center lg:w-[50%] w-[95%] h-auto px-[2rem] py-[1rem] bg-[#ffffffbb] rounded-[10px]'>
      <div className='w-full h-auto  flex flex-col justify-center items-center'>
        <p className='text-[2.5rem]'>Crea tus altas</p>
        {numbRol > 1 && (
          <p>Te quedan {foliosUser} folios por usar</p>
        )}
        
      </div>
      <div className='flex sm:flex-row flex-col items-center sm:items-start'>
        <div className=' h-auto flex flex-col gap-4  w-full'>
          <div className='w-full h-auto flex flex-col lg:px-[3rem] xl:px-[5rem] sm:px-[1rem] '>
            <p className='underline font-semibold'>Nombre:</p>
            <input
              ref={inputNombre}
              onChange={captureNombre}
              className='w-full py-[0.3rem] px-[0.5rem] rounded-[5px] border-solid border-[1px] border-gray-500'
              type='text'
            />
          </div>
          <div className='w-full h-auto flex flex-col lg:px-[3rem] xl:px-[5rem] sm:px-[1rem]'>
  <p className='underline font-semibold'>Foto:</p>
  {fotoLoading? (
    <p>Cargando foto...</p>
  ) : (
    <>
      {fotoCargada ? (
        <>
        <div className='flex flex-col'>
        <img className='w-[5rem]' src={foto} alt="" />
        </div>
        </>
      ) : (
        <input ref={inputFoto} className='w-full py-[0.3rem]' type='file' onChange={FileFotos} />
      )}
    </>
  )}
</div>

          <div className='w-full h-auto flex flex-col lg:px-[3rem] xl:px-[5rem] sm:px-[1rem] gap-4'>
            
            <button className='flex gap-5 sm:mb-0 mb-[2rem] bg-[#17103a] rounded-[3px] justify-center items-center py-[0.3rem] text-white' onClick={folioactual}>Generar folio...</button>
            {folio && ( 
              <>
              <p className='underline font-semibold'>Folio</p>
              <input
              value={folio}
              className='w-full py-[0.3rem] px-[0.5rem] rounded-[5px] border-solid border-[1px] border-gray-500'
              type='number'
            /> 
            </>
            )}
        </div>
        </div>
        <div className=' h-auto  flex flex-col gap-4 w-full'>
        <div className='w-full h-auto flex flex-col sm:px-[5rem] '>
  <p className='underline font-semibold'>Huella:</p>
  {huellaLoading ? (
    <p>Cargando huella...</p>
  ) : (
    <>
      {archivoCargado ? (
        <img className='w-[5rem]' src={huella} alt="" />
      ) : (
        <input ref={inputHuella} className=' w-full py-[0.3rem]' type='file' onChange={FileHuellas} />
      )}
    </>
  )}
</div>

          <div className='w-full h-auto flex flex-col sm:px-[5rem] '>
            <p className='underline font-semibold'>Expedición</p>
            <input
              value={expedicion}
              className=' py-[0.3rem] px-[0.5rem] w-full  rounded-[5px] border-solid border-[1px] border-gray-500'
              type='text'
            />
          </div>
          <div className='w-full h-auto flex flex-col sm:px-[5rem]'>
            <p className='underline font-semibold'>Vigencia</p>
            <input
              value={vigenciaDate}
              className='py-[0.3rem] px-[0.5rem] w-full rounded-[5px] border-solid border-[1px] border-gray-500'
              type='text'
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[10vh] flex justify-center items-center">
        <button onClick={crearAltas} className="w-full px-[1rem] py-[0.5rem] bg-[#17103a] text-white rounded-[10px]">
          {loading ? 'Creando...' : 'Crear Antecedente'}
        </button>
      </div>
      </div>
    </div>
  );
}
