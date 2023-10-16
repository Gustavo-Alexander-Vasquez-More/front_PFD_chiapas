import React, { useEffect } from 'react';
import antecedentes_actions from '../redux/actions/antecedentesActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { closePath } from 'pdf-lib';

export default function validacionAntecedente() {
const  folioParam  = useParams();
const resultParam=folioParam.folio
const dispatch=useDispatch()
useEffect(() => {
dispatch(antecedentes_actions.read_AllAntecedentes())
}, []);
const antecedentes=useSelector((store)=>store.antecedentes.AllAntecedentes)
console.log(antecedentes);
const antecedenteFiltrado = Array.isArray(antecedentes)
  ? antecedentes?.filter(antecedente => antecedente?.folio === resultParam)
  : [];
const folio=antecedenteFiltrado.map(antecedente=> antecedente.folio)
const expedicion=antecedenteFiltrado.map(antecedente=> antecedente.expedicion.split('T')[0])
console.log(expedicion);
const expedicionArray = expedicion[0]
console.log(expedicionArray);
const creacion = antecedenteFiltrado.map(antecedente => {
  const [fecha, hora] = antecedente.createdAt.split('T');
  const [horaSinMilisegundos] = hora.split('.');
  return horaSinMilisegundos;
});

console.log(creacion);


return (
    <div className='w-full h-screen'>
      <div className='w-full h-[30¿5vh] bg-white flex flex-col'>
        <img className='hidden lg:block' src="https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/navXl.png?alt=media&token=73fe99f5-bd24-470d-a58c-13697a6716ba&_gl=1*qo5bxp*_ga*MTQ4NzE3MDk0NC4xNjkzOTUwNDk1*_ga_CW55HF8NVT*MTY5NzQ2MTk4NC4zOS4xLjE2OTc0NjI1NjcuNjAuMC4w" alt="" />
      <img className='hidden  lg:hidden sm:block' src="https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/nav640.png?alt=media&token=69432b25-4d27-4324-b5c5-f145520e33c6&_gl=1*1dt59m7*_ga*MTQ4NzE3MDk0NC4xNjkzOTUwNDk1*_ga_CW55HF8NVT*MTY5NzQ2MTk4NC4zOS4xLjE2OTc0NjMyMjIuNjAuMC4w" alt="" />
      <img className='block sm:hidden' src="https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/nav320.png?alt=media&token=b49ac56f-e6ec-4dbe-83b7-95b7021f39bf&_gl=1*13aqta4*_ga*MTQ4NzE3MDk0NC4xNjkzOTUwNDk1*_ga_CW55HF8NVT*MTY5NzQ2MTk4NC4zOS4xLjE2OTc0NjMzMjIuNjAuMC4w" alt="" />
      </div>
     <div className='w-full lg:h-[15vh] h-[20vh]  flex flex-col justify-center text-center items-center '>
    <p className='text-[#731b1e] lg:text-[2rem] text-[1.5rem] font-semibold'>Validación de</p>
    <p className='text-[#731b1e] lg:text-[2rem] text-[1.5rem] font-semibold'>Constancia de No Antecedentes Penales</p>
    </div>
    <div className='w-full lg:h-[85vh] h-[110vh] flex flex-col items-center '>
    <div className='lg:w-[45%] w-[90%]  h-auto '>
    {antecedenteFiltrado.map(antecedente=>(
    <p  className='text-[1.3rem] sm:flex flex-col gap-3'>FOLIO: <p className='text-[#731b1e] font-semibold'>{antecedente.folio}</p></p>
     ))}
    <p className='text-[1.3rem]  sm:flex flex-col gap-3'>OFICINA QUE EXPIDIÓ: <p className='text-[#731b1e] font-semibold'>00000001 PJECH MODULO PALACIO TUXTLA</p></p>
    {antecedenteFiltrado.map(antecedente=>(
     <p className='text-[1.3rem] sm:flex flex-col gap-3'>CONSTANCIA A NOMBRE DE: <p className='text-[#731b1e] font-semibold'>{antecedente.nombre.toUpperCase()}</p></p>
      ))}
     <p className='text-[1.3rem] sm:flex flex-col gap-3'>DE FECHA : <p className='text-[#731b1e] font-semibold'>{expedicionArray}</p></p>
     <p className='text-[1.3rem] sm:flex flex-col gap-3'>CON ANTECEDENTES: <p className='text-[#731b1e] font-semibold'>NO</p></p>
     <p className='text-[1.3rem] '>CADENA DE CERTIFICACION:</p>
     
     <p className='text-[#731b1e] font-semibold w-[95%] h-auto  break-words'>
  ||{folio}|bf1a|{expedicionArray}|{creacion}|HElKFhZJRVJ9NDAyMjg1MTl8FDAwEDAkMzKyMzh8NzMxOLQzOHwyMDIzLTAxLTA2VDE1OjIzOjI4
  SXNXAMVGNDDDAWMXAV3HMADWSCDCCAecdDWSDGGTTRFG66GBUKRFU3xQSkVDSF9NT0RV
  TI9EIE854VGCancOHNIINVGDASARTHBBNCDObohbewASBCBHECfe3nHUI76VVhUTuF8fZ==||
</p>

     
    
    </div>
    </div>
    <footer className='w-full h-auto mt-[5rem]'>
    <img className='hidden xl:block' src=" https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/footerXL.png?alt=media&token=fdac77a3-2f9e-49b3-aab4-1a2b5c0b3eff&_gl=1*1u24dt4*_ga*MTQ4NzE3MDk0NC4xNjkzOTUwNDk1*_ga_CW55HF8NVT*MTY5NzQ2MTk4NC4zOS4xLjE2OTc0NjI2OTMuNjAuMC4w" alt="" />
    <img className='xl:hidden hidden lg:block' src="https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/footer1024.png?alt=media&token=f0e39514-1cfc-4fb5-8838-c8c8aa6b293a&_gl=1*1r59y3n*_ga*MTQ4NzE3MDk0NC4xNjkzOTUwNDk1*_ga_CW55HF8NVT*MTY5NzQ2MTk4NC4zOS4xLjE2OTc0NjI4NDUuNjAuMC4w" alt="" />
    <img className='xl:hidden lg:hidden hidden sm:block' src="https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/footer640.png?alt=media&token=67c475fa-4d2f-4d22-a14a-27f8320a42ee&_gl=1*ryoynl*_ga*MTQ4NzE3MDk0NC4xNjkzOTUwNDk1*_ga_CW55HF8NVT*MTY5NzQ2MTk4NC4zOS4xLjE2OTc0NjI5MzEuNjAuMC4w" alt="" />
    <img className='xl:hidden lg:hidden  block sm:hidden' src="https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/footer320.png?alt=media&token=889526de-41cd-401c-a483-1f9517e20e64&_gl=1*1jaugc2*_ga*MTQ4NzE3MDk0NC4xNjkzOTUwNDk1*_ga_CW55HF8NVT*MTY5NzQ2MTk4NC4zOS4xLjE2OTc0NjMwMTcuNjAuMC4w" alt="" />
    </footer>
    </div>
  );
}
