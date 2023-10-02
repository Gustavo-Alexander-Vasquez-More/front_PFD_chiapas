import React from 'react';
import { Link as Anchor } from 'react-router-dom';
export default function index() {
  return (
    <div className='w-full h-screen  flex flex-col items-center  py-[3rem] '>
  <img className='lg:w-[25rem] lg:h-[9rem] sm:w-[23rem] w-[15rem]' src="https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/index%2Flogochiapas%20(2).png?alt=media&token=f91ff33d-3dc3-4617-8359-a95e29318fa3" alt="" />
    <div className='lg:w-[45%]  h-auto flex flex-col gap-7 py-[3rem]  xl:w-[35%] 2xl:w-[35%] sm:w-[60%] w-[85%] items-center'>
    <div className=' w-full px-[1rem] flex flex-col gap-2 '>
    <p className='sm:text-[1.2rem] text-[1rem]'>Usuario:</p>
    <input className='rounded-[5px] py-[0.3rem] px-[0.5rem] w-full border-solid border-[1px] border-[gray]' type="text" placeholder='Ingrese su usuario' />
    </div>
    <div className='w-full px-[1rem] flex flex-col gap-2'>
    <p className='sm:text-[1.2rem] text-[1rem]'>Contraseña:</p>
    <input className='rounded-[5px] py-[0.3rem] px-[0.5rem] w-full  border-solid border-[1px] border-[gray]' type="text" placeholder='Ingrese su contraseña'/>
    </div>
    <Anchor to='/panelAdmin' className='w-[50%] bg-[#428ee4] py-[0.5rem] rounded-[10px] text-[white] text-center'>Ingresar</Anchor>
    </div>
    </div>
  );
}
