import React, { useEffect, useState } from 'react';
import {PDFDownloadLink} from '@react-pdf/renderer';
import ConsultaPDF from '../pages/consultaPDF';
import axios from 'axios';
export default function download_pdf({close_modal2, folio}) {
  const [datas, setDatas]=useState()
  
const [nombre, setNombre]=useState()

useEffect(() => {
  get()
  }, [folio]);
  const get = async () => {
  try {
      const { data } = await axios.get(`https://backpdfchiapas-production.up.railway.app/api/antecedentes/read_especific/${folio}`);
      setDatas(data.response)  
      setNombre(data.response?.nombre)  
      return data.response// Establecemos los datos
  } catch (error) {
      console.error('Error fetching data:', error);
  }};
  return (
    <div className='absolute lg:w-[35%] w-[95%]  rounded-[10px] py-[2rem] flex flex-col gap-4 bg-white'>
      <div className='flex justify-end items-end  pr-[1rem]'>
        <button onClick={close_modal2}>
        <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>

        </button>
        
      </div>
      <div className='font-semibold flex justify-center items-center text-center'>
        <p>ESPERA A QUE SE GENERE EL PDF</p>
      </div>
      <PDFDownloadLink
            className='w-full '
             document={<ConsultaPDF folio={folio} />}
             fileName={`${nombre}_NO_TIENE_ANTECEDENTES.pdf`}
             >
             {({ loading}) =>
          loading ?
              <div className='w-full  flex justify-center items-center'>
                 <div className='flex flex-col gap-2 items-center'>
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <p>Generando PDF</p>
                 </div>
              </div> 
              :
              <>
              {folio && nombre && (
                <div className='w-full  flex justify-center items-center'>
                <button  className='bg-primary px-[1rem] py-[0.3rem] text-white font-semibold rounded-[5px]'>Descargar PDF</button>
              </div>
              )}
              </>
        }
      </PDFDownloadLink>
    </div>
  );
}
