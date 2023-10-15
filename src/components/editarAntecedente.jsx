import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import Swal from 'sweetalert2';
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
  async function editarLicencia(){
    const payload={
        parametro:param,
        datos: {
            [opcionSelect]: inputValue
          }
        }
        console.log(payload);
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
          </div>
            <div className='w-full flex justify-center'>

            <button onClick={editarLicencia} className='lg:w-[30%] sm:w-[40%] w-full py-[0.3rem] bg-[#2aca2a] hover:bg-[green] text-[white] rounded-[10px]'>Editar</button>
            </div>
        </div>
      </div>
    </div>
  );
}
