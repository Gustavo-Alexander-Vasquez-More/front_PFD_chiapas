import React, { useEffect } from 'react';
import userActions from '../redux/actions/userActions.js';
import { useDispatch, useSelector } from 'react-redux';

export default function coneccion() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(userActions?.read_users());
    }, []);
    const usuarios = useSelector((state) => state.users.users) || [];
    
  return (
    <div className='w-full h-auto min-h-[90vh] flex justify-center items-center bg-[url("https://media.gq.com.mx/photos/5d503b24e640cd0009a4511a/16:9/w_2560%2Cc_limit/GettyImages-537315513.jpg")] bg-no-repeat bg-cover'>
      <table className='border bg-[#ffffffc9] border-gray-500 w-[60%]'>
        <thead>
          <tr>
            <th className='border-[gray] border-solid border-[1px] p-2'>USUARIO</th>
            <th className='border-[gray] border-solid border-[1px] p-2'>ESTADO</th>
          </tr>
        </thead>
        <tbody>
  {usuarios.length > 0 ? (
    usuarios.map((user) => (
      <tr key={user.id}>
        <td className='border-[gray] border-solid border-[1px] p-2 text-center'>{user.usuario}</td>
        <td className='border-[gray] border-solid border-[1px] p-2 text-center'>
          {user.online ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Conectado
              <span className="h-2 w-2 ml-2 rounded-full bg-green-500"></span>
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Desconectado
              <span className="h-2 w-2 ml-2 rounded-full bg-red-500"></span>
            </span>
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr key="no-users">
      <td colSpan="2" className='text-center p-2'>
        No hay usuarios disponibles.
      </td>
    </tr>
  )}
</tbody>
      </table>
    </div>
  );
}
