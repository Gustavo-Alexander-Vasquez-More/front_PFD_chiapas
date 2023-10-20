import React, { useEffect, useRef } from 'react';
import { Page, Document, Image, StyleSheet, View, Text, PDFDownloadLink } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import antecedentes_actions from '../redux/actions/antecedentesActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const consultaPDF= () => {
 
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
  const nombre=antecedenteFiltrado?.map(antecedente=>antecedente.nombre.toUpperCase())
  
  const obtenerNombreMes = (numeroMes) => {
    const nombresMeses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

console.log(nombre);
    return nombresMeses[numeroMes - 1] || '';
  };
const expedicion=antecedenteFiltrado.map(antecedente=>antecedente.expedicion)
console.log(expedicion);
const fechaExpedicion = new Date(expedicion);
const numeroMes = fechaExpedicion.getMonth() + 1; 
const nombreMes = obtenerNombreMes(numeroMes);
const fotoUrl = antecedenteFiltrado?.length > 0 ? antecedenteFiltrado[0].foto.replace(/\\/g, '/') : null;
console.log(fotoUrl);
const huellaUrl = antecedenteFiltrado?.length > 0 ? antecedenteFiltrado[0].huella?.replace(/\\/g, '/') : null;
const diaMes=fechaExpedicion.getDate()+1
function numeroALetras(numero) {
  const unidades = [
    'Cero', 'Un', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve',
    'Diez', 'Once', 'Doce', 'Trece', 'Catorce', 'Quince', 'Dieciséis', 'Diecisiete', 'Dieciocho', 'Diecinueve'
  ];
  const decenas = [
    '', '', 'Veinte', 'Treinta', 'Cuarenta', 'Cincuenta', 'Sesenta', 'Setenta', 'Ochenta', 'Noventa'
  ];

  if (numero < 20) {
    return unidades[numero];
  } else if (numero < 30) {
    return 'Veinti' + unidades[numero - 20];
  } else {
    const unidad = numero % 10;
    const decena = Math.floor(numero / 10);
    return decenas[decena] + (unidad !== 0 ? ' y ' + unidades[unidad] : '');
  }
}

const diaEnLetras = numeroALetras(diaMes);
const dia=diaEnLetras.toUpperCase()  
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

  const styles = StyleSheet.create({
     page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
    image: {
      width: '100vw', // Ancho de la imagen
      height: '100vh',
      position:'relative' // Alto de la imagen
    },
    foto: {
      width: '13%', // Ancho de la imagen
      height: '13%', 
      position:'absolute',
      top:'25%',
      left:'6%'
    },
    sello: {
      width: '15%', // Ancho de la imagen
      height: '11.5%', 
      position:'absolute',
      top:'35.5%',
      left:'8%'
    },
    huella: {
      width: '8%', // Ancho de la imagen
      height: '7%', 
      position:'absolute',
      top:'49%',
      left:'7%'
    },
    nombre: {
      position:'absolute',
      top:'48.5%',
      left:'31%',
      fontSize:12.5
    },
    vigencia: {
      position:'absolute',
      top:'92.4%',
      left:'47%',
      fontSize:10
    },
    folioRojo: {
      position:'absolute',
      top:'16.2%',
      left:'86%',
      fontSize:15.5,
      color:'red'
    },
    
    qrContainer: {
      position:'absolute',
      top:'79.4%',
      left:'75%',
      width:'21%',
      height:'16%',
      backgroundColor:'white',
      padding:6,
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    nombreMes: {
      position:'absolute',
      top:'58.7%',
      left:'42%',
      fontSize:9.5
    },
    nombreDia: {
      position:'absolute',
      top:'57.3%',
      left:'67%',
      fontSize:9.5
    },
  });
  function generateDownloadLink() {
    return (
      <PDFDownloadLink
        document={<Document title={`${folio}_${nombre}_NO_TIENE_ANTECEDENTES.pdf`}>
          <Page size="A4">
          <View >
    <Image style={styles.image} src={{ uri:'https://backpdfchiapas-production.up.railway.app/uploads/sinsello.jpg' , method: 'GET'}}/>
    <Image style={styles.foto} src={{ uri:`https://backpdfchiapas-production.up.railway.app/${fotoUrl}` , method: 'GET'}}/>
    <Image style={styles.huella} src={{ uri:`https://backpdfchiapas-production.up.railway.app/${huellaUrl}` , method: 'GET'}}/>
    <Image style={styles.sello} src={{ uri:`https://backpdfchiapas-production.up.railway.app/uploads/sello.png` , method: 'GET'}}/>
    <Text style={styles.nombre}>{nombre}</Text>
    <Text style={styles.vigencia}>{formattedVigencia}</Text>
    <View style={styles.qrContainer}>
    <Image style={styles.qr} src={{ uri:`https://backpdfchiapas-production.up.railway.app/${qrUrl}` , method: 'GET'}}/>
    </View>
    <Text style={styles.folioRojo}>{folio}</Text>
    <Text style={styles.nombreMes}>{nombreMes.toUpperCase()}</Text>
    <Text style={styles.nombreDia}>{diaEnLetras.toUpperCase()}</Text>
    
    </View>
          </Page>
        </Document>}
        fileName={`${folio}_${nombre}_NO_TIENE_ANTECEDENTES.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Generando PDF...' : 'Descargar PDF'
        }
      </PDFDownloadLink>
    );
  }

return (
  <>
 {generateDownloadLink()} {/* Renderiza el enlace de descarga */}
<PDFViewer className='w-full h-screen'>

<Document title={`${folio}_${nombre}_NO_TIENE_ANTECEDENTES.pdf`}>
<Page size="A4"  >
    <View >
    <Image style={styles.image} src={{ uri:'https://backpdfchiapas-production.up.railway.app/uploads/sinsello.jpg' , method: 'GET'}}/>
    <Image style={styles.foto} src={{ uri:`https://backpdfchiapas-production.up.railway.app/${fotoUrl}` , method: 'GET'}}/>
    <Image style={styles.huella} src={{ uri:`https://backpdfchiapas-production.up.railway.app/${huellaUrl}` , method: 'GET'}}/>
    <Image style={styles.sello} src={{ uri:`https://backpdfchiapas-production.up.railway.app/uploads/sello.png` , method: 'GET'}}/>
    <Text style={styles.nombre}>{nombre}</Text>
    <Text style={styles.vigencia}>{formattedVigencia}</Text>
    <View style={styles.qrContainer}>
    <Image style={styles.qr} src={{ uri:`https://backpdfchiapas-production.up.railway.app/${qrUrl}` , method: 'GET'}}/>
    </View>
    <Text style={styles.folioRojo}>{folio}</Text>
    <Text style={styles.nombreMes}>{nombreMes.toUpperCase()}</Text>
    <Text style={styles.nombreDia}>{diaEnLetras.toUpperCase()}</Text>
    
    </View>
  </Page>
</Document>
       
</PDFViewer>
  
 
  </>

  );
};

export default consultaPDF;
