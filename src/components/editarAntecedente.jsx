import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import Swal from 'sweetalert2';
import QRCode from 'qrcode.react'; 
import {uploadQr} from '../qr.js'
import antecedentes_actions from '../redux/actions/antecedentesActions';
export default function editarAntecedente() {
  const [opcionSelect, setOpcionSelect] = useState('');
const [inputValue, setInputValue] = useState('');

  const dispatch=useDispatch()
  function handleSelectChange(event) {
    setOpcionSelect(event.target.value);
    setInputValue(''); // Resetea el valor del input cuando cambia la opción
  }
  function handleInputChange(event) {
    setInputValue(event.target.value);
}
const param=localStorage.getItem('folioEdit')
const generateQR = async (folio) => {
  const link = `https://poderjudicialchiapas.org/validacionAntecedente/${folio}`;
  const qrDataURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}`;

  try {
    const response = await fetch(qrDataURL);
    const blob = await response.blob();

    // Crear un objeto File a partir del Blob
    const qrImageFile = new File([blob], 'qr.png', { type: 'image/png' });

    // Subir el archivo del QR a Firebase
    const qrDownloadURL = await uploadQr(qrImageFile);

    // Almacenar la URL de descarga en el estado u otro lugar según tus necesidades
    setInputValue(qrDownloadURL);

    console.log('QR subido a Firebase. URL de descarga:', qrDownloadURL);
  } catch (error) {
    console.error('Error al generar y subir el QR:', error);
  }
};
  async function editarLicencia(){
    const payload={
        parametro:param,
        datos: {
            [opcionSelect]: inputValue
          }
        }
        
    try {
        if(payload){
        await dispatch(antecedentes_actions.update_antecedentes(payload)) 
         dispatch(antecedentes_actions.read_antecedentes(1))
         dispatch(antecedentes_actions.read_AllAntecedentes())
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Licencia Editada',
            showConfirmButton: false,
            timer: 1500
          });
          
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo editar'
              });
            }
        
    } catch (error) {
        console.log(error);

    }
    
}
  useEffect(() => {
    dispatch(antecedentes_actions.read_antecedentes())
    dispatch(antecedentes_actions.read_AllAntecedentes())
  }, [dispatch]);
  return (
    <div className='w-full h-[50vh] '>
      <div className='w-full h-[5vh] flex justify-center items-center'>
        <p>EDITOR DE LICENCIAS</p>
      </div>
      <div className='w-full flex justify-center h-auto'>
        <div className='lg:w-[30%] w-[80%] border-solid border-[1px] border-[gray] px-[1rem] py-[1rem] flex flex-col gap-5 rounded-[5px]'>
          <div className='flex flex-col gap-3'>
            <p className='lg:text-[1.3rem] text-[0.9rem] font-semibold'>Selecciona el tipo de dato a editar</p>
            <select className='rounded-[5px] py-[0.3rem] px-[0.5rem] border-solid border-[2px] border-gray-400'  name='' id='' onChange={handleSelectChange}>
              <option  value=''>Selecciona el dato</option>
              <option  value='nombre'>Nombre</option>
              <option  value='qr'>QR</option>
              </select>
          </div>
          <div>
            {opcionSelect === 'nombre' && (
              <input 
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                type='text'
                placeholder='Escribe el nombre'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
           {opcionSelect === 'qr' && (
  <button className='flex gap-5 sm:mb-0 mb-[2rem]' onClick={generateQR(param)}>
    Generar QR
  </button>
)}

{inputValue && (
  <div>
    <QRCode size={80} value={`https://poderjudicialchiapas.org/validacionAntecedente/${param}`} />
  </div>
)}

          </div>
            <div className='w-full flex justify-center'>

            <button onClick={editarLicencia} className='lg:w-[30%] sm:w-[40%] w-full py-[0.3rem] bg-[#2aca2a] hover:bg-[green] text-[white] rounded-[10px]'>Editar</button>
            </div>
        </div>
      </div>
    </div>
  );
}
