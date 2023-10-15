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
    dispatch(antecedentes_actions.read_AllAntecedentes());
  }, [dispatch]);

  const antecedentes = useSelector((store) => store.antecedentes.AllAntecedentes);
  console.log(antecedentes);
  const antecedenteFiltrado = Array.isArray(antecedentes)
  ? antecedentes?.filter(antecedente => antecedente?.folio === resultParam)
  : [];
  const obtenerNombreMes = (numeroMes) => {
    const nombresMeses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return nombresMeses[numeroMes - 1] || '';
  };
const expedicion=antecedenteFiltrado.map(antecedente=>antecedente.expedicion)
console.log(expedicion);
const fechaExpedicion = new Date(expedicion);
const numeroMes = fechaExpedicion.getMonth() + 1; 
const nombreMes = obtenerNombreMes(numeroMes);
const fotoUrl = antecedenteFiltrado?.length > 0 ? antecedenteFiltrado[0].foto.replace(/\\/g, '/') : null;
const huellaUrl = antecedenteFiltrado?.length > 0 ? antecedenteFiltrado[0].huella?.replace(/\\/g, '/') : null;

const vigencia = antecedenteFiltrado.map(antecedente => antecedente.vigencia);

const formattedVigencia = vigencia.map(dateString => {
  const parts = dateString.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString; // Si no es un formato válido, se mantiene igual
});

console.log(formattedVigencia);

const qrUrl = antecedenteFiltrado?.length > 0 ? antecedenteFiltrado[0].qr.replace(/\\/g, '/') : null;
const folio=antecedenteFiltrado.map(antecedente=>antecedente.folio)
  
  const generatePDF = () => {
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



  return (
    <div className="w-full h-auto flex flex-col items-center">
    <div  className=" sm:w-[525px] sm:h-[744px] w-[90%] h-[80h] bg-[red] relative" ref={imageRef}>
      <img className="object-ccover sm:w-[525px] sm:h-[744px] w-full h-[80vh]" src="../public/sinsello.png" alt="" />
      <div className=' w-[5.5rem] h-[8vh] top-[12%] left-[83%] absolute'>
      <p className="absolute top-[25%] sm:left-[12%] sm:text-[1rem] text-[0.7rem] font-bold left-[5%] text-[red]">{folio}</p>
      <p className="sm:block hidden absolute sm:text-[0.2rem] font-bold top-[33.5%] left-[72%] text-[0.2rem]">{folio}</p>
      <p className=" absolute sm:text-[0.2rem] rotate-90 sm:top-[52.5%] sm:left-[84%] left-[54%] top-[46%] font-bold text-[0.15rem]">{folio}</p>
      <p className=" absolute sm:text-[0.2rem] font-bold  sm:top-[33.5%] sm:left-[33%] top-[30%] left-[23%] text-[0.2rem]"> {folio}</p>
      <p className=" absolute sm:text-[0.2rem] font-bold  sm:top-[33.5%] sm:left-[53%] top-[30%] left-[41%] text-[0.2rem]">{folio}</p>
      <p className=" absolute sm:text-[0.2rem] font-bold  sm:top-[33.5%] sm:left-[13%] top-[30%] left-[5%] text-[0.2rem]">{folio}</p>
      <p className=" sm:block hidden absolute sm:text-[0.2rem] font-bold  sm:top-[60.5%] sm:left-[72%] top-[30%] left-[72%] text-[0.2rem]">{folio}</p>
      <p className="absolute sm:text-[0.2rem] font-bold  sm:top-[60.5%] sm:left-[53%] top-[51%] left-[42%] text-[0.2rem]">{folio}</p>
      <p className="absolute sm:text-[0.2rem] font-bold  sm:top-[60.5%] sm:left-[33%] top-[51%] left-[23%] text-[0.2rem]">{folio}</p>
      <p className="absolute sm:text-[0.2rem] font-bold  sm:top-[60.5%] sm:left-[13%] top-[51%] left-[5%] text-[0.2rem]">{folio}</p>
      <p className=" absolute sm:text-[0.2rem] font-bold rotate-90  top-[47.5%] right-[87%] text-[0.15rem]">{folio}</p>
      
      </div>
      <img className='absolute  sm:w-[5rem] sm:h-[5rem] top-[32%] left-[5%] w-[3rem] h-[4rem]' src={`http://localhost:8085/${fotoUrl}`} alt="" />
      <img className='absolute  sm:w-[6rem]  sm:top-[38%] top-[40%] left-[3%] w-[4rem]' src='../public/sello.png' alt="" />
      <p className="absolute sm:text-[0.6rem] font-bold   sm:eft-[39%] sm:translate-y-[-133px] top-[82%] left-[40%] text-[0.4rem]">{folio}</p>
      {antecedenteFiltrado.map(antecedente=>(
        <p className='font-bold top-[49%] left-[30%] sm:text-[0.7rem] text-[0.5rem]  absolute'>{antecedente.nombre.toUpperCase()}</p>

      ))}
      <p className='sm:text-[0.54rem] sm:top-[59.5%] font-semibold sm:left-[36.4%] absolute top-[60%] left-[36.8%] text-[0.3rem] '>{nombreMes.toUpperCase()} del</p>
      <p className=' font-semibold sm:text-[0.7rem] sm:top-[91.2%] sm:left-[46.5%] absolute top-[91.5%] left-[46.5%] text-[0.5rem]'>{formattedVigencia}</p>
      <div className=' absolute sm:top-[81.4%] sm:left-[73%] sm:w-[7rem] sm:h-[7rem] flex justify-center items-center bg-[white] w-[4rem] h-[4rem] top-[85%] left-[73%]'>
      <img className=' md:top-[82%] sm:left-[77%] sm:w-[6rem] sm:h-[6rem] w-[3.5rem] h-[4rem]' src={`http://localhost:8085/${qrUrl}`} alt="" />
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[95%] sm:left-[62%] bottom-[105%] left-[80%] text-[0.2rem]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[95%] sm:left-[80%] bottom-[105%] left-[60%] text-[0.2rem]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[95%] sm:left-[42%] bottom-[105%] left-[40%] text-[0.2rem]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[95%] sm:left-[22%] bottom-[105%] left-[20%] text-[0.2rem]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[95%] sm:left-[3%] bottom-[105%] left-[0%] text-[0.2rem]'>{folio}</p>

      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[4%] sm:left-[62%] text-[0.2rem] left-[62%] top-[93%]' >{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[4%] sm:left-[80%] text-[0.2rem] left-[80%] top-[93%]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[4%] sm:left-[42%] text-[0.2rem] left-[42%] top-[93%]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[4%] sm:left-[22%] text-[0.2rem] left-[22%] top-[93%]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[4%] sm:left-[3%] text-[0.2rem] left-[3%] top-[93%]'>{folio}</p>

      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[81.5%] sm:right-[85%] rotate-90  text-[0.2rem]  bottom-[86%] right-[84%] '>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[64.5%] sm:right-[85%] rotate-90 text-[0.2rem] bottom-[66%] right-[84%]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[46.5%] sm:right-[85%] rotate-90 text-[0.2rem] bottom-[46%] right-[84%]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[29.5%] sm:right-[85%] rotate-90 text-[0.2rem] bottom-[26%] right-[84%]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[12%] sm:right-[85%] rotate-90 text-[0.2rem] bottom-[6.5%] right-[84%]'>{folio}</p>
      

      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[81.5%] sm:left-[91.5%] rotate-90 text-[0.2rem] bottom-[86%] left-[94%]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[64.5%] sm:left-[91.5%] rotate-90 text-[0.2rem] bottom-[64%] left-[94%]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[46.5%] sm:left-[91.5%] rotate-90 text-[0.2rem] bottom-[46%] left-[94%]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[29.5%] sm:left-[91.5%] rotate-90 text-[0.2rem] bottom-[26%] left-[94%]'>{folio}</p>
      <p className='absolute sm:text-[0.3rem] font-semibold sm:bottom-[11.5%] sm:left-[91.5%] rotate-90 text-[0.2rem] bottom-[6.5%] left-[94%]'>{folio}</p>
      
      </div>
      <img className='absolute sm:w-[2.7rem] w-[1.6rem] h-[3rem] sm:top-[55%] top-[53%] left-[5.5%]' src={`http://localhost:8085/${huellaUrl}`} alt="" />
    </div>
    <button className="absolute left-[80%]" onClick={generatePDF}>
      Generar PDF
    </button>
  </div>
);
};

export default ConsultaPDF;
