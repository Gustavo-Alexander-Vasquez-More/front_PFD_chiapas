import React, { useEffect, useRef, useState } from 'react';
import {uploadFile} from '../firebase/fotos.js'
import {uploadHuellas} from '../firebase/huellas.js'
import {uploadQr} from '../firebase/qrs.js'
import antecedentesActions from '../redux/actions/antecedentesActions.js'
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'qrcode.react'; 
export default function crearAltas() {
const [foto, setFoto]=useState(null)
const [huella, setHuella]=useState(null)
const [qr, setQr] = useState(null);
const inputFoto=useRef()
const inputHuella=useRef()
const dispatch=useDispatch()
useEffect(() => {
dispatch(antecedentesActions.read_antecedentes())
}, [dispatch]);
const antecedentes=useSelector((store)=>store.antecedentes.antecedentes)
console.log(antecedentes);
const handleFileChange = async (e) => {
        try {
        const selectedFile = e.target.files[0]; // Obtener el archivo seleccionado
        if (selectedFile) {
        const downloadURL = await uploadFile(selectedFile); // Subir el archivo y obtener la URL de descarga
        console.log('URL de descarga:', downloadURL);
    setFoto(downloadURL);
    }
    } catch (error) {
        console.error('Error al cargar el archivo:', error);
    }};
    const handleHuellaChange = async (e) => {
        try {
        const selectedHuella = e.target.files[0]; // Obtener el archivo seleccionado
        if (selectedHuella) {
        const downloadURL = await uploadHuellas(selectedHuella); // Subir el archivo y obtener la URL de descarga
        console.log('URL de descarga:', downloadURL);
    setHuella(downloadURL);
    }
    } catch (error) {
        console.error('Error al cargar el archivo:', error);
    }};
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
       
        const ultimoFolio = antecedentes.reduce((maxFolio, antecedente) => {
          const antecedenteFolio = parseInt(antecedente.folio, 10);
          return antecedenteFolio > maxFolio ? antecedenteFolio : maxFolio;
        }, 0);
    console.log(ultimoFolio);
        const nuevoFolio = ultimoFolio + 1;
    
        // Formatear el nuevo folio con ceros a la izquierda
        
        return nuevoFolio.toString().padStart(7, '0');
      };
    
      const [folio, setFolio] = useState(obtenerNuevoFolio());
      useEffect(() => {
        const nuevoFolio = obtenerNuevoFolio();
        setFolio(nuevoFolio);
      }, [antecedentes]);  // Asegúrate de actualizar el folio cuando los antecedentes cambien
      
      const generarQR = () => {
        const link = `http://localhost:5174/validacionAntecedente/${folio}`;
        setQr(link);  // Almacenar el link en el estado del QR
    
        // Generar el QR en formato imagen
        // Esto crea un elemento de imagen y lo convierte a un enlace descargable
        const qrImage = new Image();
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}`;
    
        // Subir el QR a Firebase Storage
        uploadQr(qrImage)
          .then(downloadURL => {
            console.log('URL del QR:', downloadURL);
          })
          .catch(error => {
            console.error('Error al cargar el QR:', error);
          });
      };
  return (
    <div className='w-full h-[90vh] '>
    <div className='w-full h-[20vh]  flex justify-center items-center'>
        <p className='text-[2.5rem]'>Crea tus altas</p>
    </div>
    <div className='flex'>
        <div className='w-[50%] h-[45vh]  flex flex-col gap-4 '>
            <div className='w-full h-auto flex flex-col px-[5rem]'>
                <p>Nombre:</p>
                <input className='w-[40%] py-[0.3rem] px-[0.5rem] rounded-[5px] border-solid border-[1px] border-gray-500' type="text" />
            </div>
            <div className='w-full h-auto flex flex-col px-[5rem]'>
                <p>Foto:</p>
                <input  ref={inputFoto} className='w-[40%] py-[0.3rem] ' type="file" onChange={handleFileChange} />
            </div>
            {foto && (
  <div className='w-full h-auto flex flex-col px-[5rem] gap-4'>
    <p>Folio</p>
    <input value={folio} className='w-[20%] py-[0.3rem] px-[0.5rem] rounded-[5px] border-solid border-[1px] border-gray-500' type="number" />
    
    <button onClick={generarQR} className='w-[30%] bg-[blue]'>Generar QR</button>
    {qr && (
                            <div>
                                <p>QR generado:</p>
                                {/* Utilizando la biblioteca QRCode para mostrar el QR */}
                                <QRCode value={qr} />
                            </div>
                        )}
    
  </div>
)}
</div>
        <div className='w-[50%] h-[45vh]  flex flex-col gap-4'>
        <div className='w-full h-auto flex flex-col px-[5rem]'>
            <p>Huella:</p>
            <input ref={inputHuella} className='w-[40%] py-[0.3rem] ' type="file" onChange={handleHuellaChange}/>
        </div>
        <div className='w-full h-auto flex flex-col px-[5rem]'>
            <p>Expedición</p>
            <input value={expedicion} className='w-[40%] py-[0.3rem] px-[0.5rem] rounded-[5px] border-solid border-[1px] border-gray-500' type="text" />
        </div>
        <div className='w-full h-auto flex flex-col px-[5rem]'>
            <p>vigencia</p>
            <input value={vigenciaDate} className='w-[40%] py-[0.3rem] px-[0.5rem] rounded-[5px] border-solid border-[1px] border-gray-500' type="text" />
        </div>
        </div>
       
    </div>
    <div className='w-full h-[10vh] flex justify-center items-center'>
            <button className='w-[20%]  px-[1rem] py-[0.5rem]  bg-[blue] text-white rounded-[10px]'>Crear Antecedente</button>
        </div>
    </div>
  );
}
