import React, { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import antecedentes_actions from '../redux/actions/antecedentesActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ConsultaPDF = () => {
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const  folioParam  = useParams();
  const resultParam=folioParam.folio
  console.log(resultParam);
  useEffect(() => {
    dispatch(antecedentes_actions.read_antecedentes());
  }, [dispatch]);

  const antecedentes = useSelector((store) => store.antecedentes.antecedentes);
  console.log(antecedentes);
  const antecedenteFiltrado = Array.isArray(antecedentes)
  ? antecedentes?.filter(antecedente => antecedente?.folio === resultParam)
  : [];

  console.log(antecedenteFiltrado);
  const fotoUrl = antecedenteFiltrado?.length > 0 ? antecedenteFiltrado[0].foto.replace(/\\/g, '/') : null;
  const qrUrl = antecedenteFiltrado?.length > 0 ? antecedenteFiltrado[0].qr.replace(/\\/g, '/') : null;
console.log(fotoUrl);
  
const generatePDF = () => {
  const image = imageRef.current;

  // Ajusta la escala de la imagen para que se ajuste al tamaño de la página
  const scaleFactor = 2; // Ajusta este valor según sea necesario
  const imgWidth = image.width * scaleFactor;
  const imgHeight = image.height * scaleFactor;

  html2canvas(image, { useCORS: true, scale: scaleFactor })
    .then((canvas) => {
      const pdfWidth = 210; // Ancho en mm (A4)
      const pdfHeight = 320; // Alto en mm (A4)

      const startX = 0; // No se necesita un desplazamiento inicial

      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas, 'PNG', startX, 0, pdfWidth, pdfHeight);
      pdf.save('documento.pdf');
    })
    .catch((error) => console.error('Error al capturar imagen:', error));
};



  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
    
      <div className="w-[50%] h-full " ref={imageRef}>
        <img className=' object-cover w-[100vw] h-[90vh]' src="../public/maqueta.jpg" alt="" />
      {antecedenteFiltrado?.map(antecedente=>(
        <p className='absolute top-[15.5%] left-[64%] font-bold'>{antecedente.folio}</p>
      ))}
       {antecedenteFiltrado?.map(antecedente=>(
        <p className='absolute bottom-[50%] left-[50%] font-bold'>{antecedente.nombre.toUpperCase()}</p>
      ))}
      <img className="w-[7rem] absolute left-[32%] top-[30%] z-0" src={`http://localhost:8085/${fotoUrl}`} alt='' />
      <div className='absolute top-[78%] left-[60%] w-[8rem] h-auto  flex justify-center items-center py-[1rem]'>
      {antecedenteFiltrado?.map(antecedente=>(
        <p className='absolute bottom-[90%] left-[65%] text-[0.6rem] font-bold'>{antecedente.folio}</p>
      ))}
       {antecedenteFiltrado?.map(antecedente=>(
        <p className='absolute bottom-[90%] text-[0.6rem] left-[33%] font-bold'>{antecedente.folio}</p>
      ))}
      {antecedenteFiltrado?.map(antecedente=>(
        <p className='absolute bottom-[90%] text-[0.6rem] left-[2%] font-bold'>{antecedente.folio}</p>
      ))}
      {antecedenteFiltrado?.map(antecedente=>(
        <p className='absolute bottom-[70.5%] text-[0.6rem] left-[79%] font-bold rotate-90'>{antecedente.folio}</p>
      ))}
      {antecedenteFiltrado?.map(antecedente=>(
        <p className='absolute bottom-[39.8%] text-[0.6rem] left-[79%] font-bold rotate-90'>{antecedente.folio}</p>
      ))}
      {antecedenteFiltrado?.map(antecedente=>(
        <p className='absolute bottom-[9%] text-[0.6rem] left-[79%] font-bold rotate-90'>{antecedente.folio}</p>
      ))}
      <img className='w-[6rem] ' src={`http://localhost:8085/${qrUrl}`} alt="" />
      </div>
      
      </div>
      <button onClick={generatePDF}>Generar PDF</button>
    </div>
  );
};

export default ConsultaPDF;
