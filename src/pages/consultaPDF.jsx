import React from 'react';
import jsPDF from 'jspdf';

const ConsultaPDF = () => {
  const pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/plantilla.pdf?alt=media&token=ef2df52a-87e6-4ffe-9c0a-e387ab15d164';
  const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/index%2FescudoChiapas.png?alt=media&token=c16974a9-0b80-4011-8ac3-e1c880dab89d';

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Cargar la imagen desde la URL
    const img = new Image();
    img.src = imageUrl;

    // Esperar a que la imagen se cargue antes de agregarla al PDF
    img.onload = () => {
      const width = 100; // Ancho de la imagen en el PDF
      const height = (img.height * width) / img.width; // Calcular la altura proporcional

      // Agregar la imagen al PDF
      doc.addImage(imageUrl, 'JPEG', 15, 15, width, height);

      // Guardar el PDF
      doc.save('pdf_con_imagen.pdf');
    };
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <div className="w-full h-screen">
        <iframe
          title="PDF Viewer"
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
          frameBorder="0"
          className="w-full h-full"
        />
      </div>

      <div className="w-full h-[10vh] flex justify-center items-center flex-shrink">
        <button onClick={handleDownloadPDF} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Descargar PDF con Imagen
        </button>
      </div>
    </div>
  );
};

export default ConsultaPDF;
