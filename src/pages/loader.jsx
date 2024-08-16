import React from 'react';

const Loader = () => (
  <div className='fixed inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50'>
    <div className='loader'>
      {/* Aquí puedes usar cualquier tipo de spinner */}
      <div className='spinner'></div>
    </div>
    <style jsx>{`
      .spinner {
        border: 16px solid #f3f3f3; /* Gris claro */
        border-top: 16px solid #731B1E; /* Azul */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Loader;