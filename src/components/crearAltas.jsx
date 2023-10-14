import React, { useEffect, useRef, useState } from 'react';
import antecedentesActions from '../redux/actions/antecedentesActions.js'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import QRCode from 'qrcode.react'; 
import { useNavigate } from 'react-router-dom';

export default function crearAltas() {
const [foto, setFoto]=useState('')
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
  dispatch(antecedentesActions.read_antecedentes())
  }, [dispatch]);
  const antecedentes=useSelector((store)=>store.antecedentes?.antecedentes)
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
const [expedicion, setExpedicion] = useState(getCurrentDate());

const calculateVigencia = (expedicionDate) => {
  const expedicion = new Date(expedicionDate);
  
  // Añadir 3 meses
  const vigencia = new Date(expedicion.getFullYear(), expedicion.getMonth() + 3, expedicion.getDate()+1);

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
  const link = `http://localhost:5174/validacionAntecedente/${folio}`;
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
const generatePDF = (componente) => {
  const image = imageRef.current;

  // Tamaño de la hoja A4 en milímetros
  const pdfWidth = 210; // Ancho en mm (A4)
  const pdfHeight = 297; // Alto en mm (A4)
const scaleFactor=2
  // Calcula el tamaño de la imagen y el div
  const imgWidth = pdfWidth / scaleFactor;
  const imgHeight = pdfHeight / scaleFactor;

  html2canvas(image, { useCORS: true, scale: scaleFactor })
    .then((canvas) => {
      const startX = 0; // No se necesita un desplazamiento inicial
      const startY = 0;

      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas, 'PNG', startX, startY, pdfWidth, pdfHeight);
      pdf.save(`Antecedente${folio}.pdf`);
    })
    .catch((error) => console.error('Error al capturar imagen:', error));
};
async function crearAltas() {
  try {
    const formData = new FormData();
    formData.append('nombre', nombre); // Asegúrate de tener la variable 'nombre' definida
    formData.append('foto', foto);
    formData.append('huella', huella);
    formData.append('qr', qr);
    formData.append('folio', folio);
    formData.append('expedicion', expedicion);
    formData.append('vigencia', vigenciaDate);
    formData.append('author_id', autor);
    if(formData){
      await dispatch(antecedentesActions.create_antecedentes(formData));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Antecedente creado',
        showConfirmButton: false,
        timer: 1500
      })
      navigate(`/consultaPDF/${folio}`)
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos!',
      text: 'No se ha podido crear el antecedente',
      })
  }
  } catch (error) {
    console.error('Error al crear antecedente:', error);
  }
}

  return (
    <div className='w-full h-[90vh] '>
      <div className='w-full h-[20vh]  flex justify-center items-center'>
        <p className='text-[2.5rem]'>Crea tus altas</p>
      </div>
      <div className='flex'>
        <div className='w-[50%] h-[45vh]  flex flex-col gap-4 '>
          <div className='w-full h-auto flex flex-col px-[5rem]'>
            <p>Nombre:</p>
            <input
              ref={inputNombre}
              onChange={captureNombre}
              className='w-[40%] py-[0.3rem] px-[0.5rem] rounded-[5px] border-solid border-[1px] border-gray-500'
              type='text'
            />
          </div>
          <div className='w-full h-auto flex flex-col px-[5rem]'>
            <p>Foto:</p>
            <input
    ref={inputFoto}
    onChange={() => setFoto(inputFoto.current.files[0])}
    className='w-[40%] py-[0.3rem]'
    type='file' name="foto"
  />
          </div>
          {foto && (
            <div className='w-full h-auto flex flex-col px-[5rem] gap-4'>
              <p>Folio</p>
              
              <input
                value={folio}
                className='w-[20%] py-[0.3rem] px-[0.5rem] rounded-[5px] border-solid border-[1px] border-gray-500'
                type='number'
              />
              <div className='flex gap-5'>
                <button onClick={generateQR} className='w-[20%] h-[5vh] bg-[#17103a] text-white py-[0.3rem] rounded-[5px]'>
                  Generar QR
                </button>
                {qr && <QRCode  size={80} value={`http://localhost:5174/validacionAntecedente/${folio}`} />}
              </div>
            </div>
          )}
        </div>
        <div className='w-[50%] h-[45vh]  flex flex-col gap-4'>
          <div className='w-full h-auto flex flex-col px-[5rem]'>
            <p>Huella:</p>
            <input ref={inputHuella} name="huella" className='w-[40%] py-[0.3rem]' type='file' onChange={() => setHuella(inputHuella.current.files[0])} />
          </div>
          <div className='w-full h-auto flex flex-col px-[5rem]'>
            <p>Expedición</p>
            <input
              value={expedicion}
              className='w-[40%] py-[0.3rem] px-[0.5rem] rounded-[5px] border-solid border-[1px] border-gray-500'
              type='text'
            />
          </div>
          <div className='w-full h-auto flex flex-col px-[5rem]'>
            <p>Vigencia</p>
            <input
              value={vigenciaDate}
              className='w-[40%] py-[0.3rem] px-[0.5rem] rounded-[5px] border-solid border-[1px] border-gray-500'
              type='text'
            />
          </div>
        </div>
      </div>
      <div className='w-full h-[10vh] flex justify-center items-center'>
        <button onClick={crearAltas} className='w-[15%]  px-[1rem] py-[0.5rem]  bg-[#17103a] text-white rounded-[10px]'>
          Crear Antecedente
        </button>
      </div>
    </div>
  );
}
