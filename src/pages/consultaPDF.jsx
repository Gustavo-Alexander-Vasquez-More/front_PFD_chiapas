import React, { useEffect, useRef, useState } from 'react';
import { Page, Document, Image, StyleSheet, View, Text, PDFDownloadLink } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import antecedentes_actions from '../redux/actions/antecedentesActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link as Anchor } from 'react-router-dom';
import Swal from 'sweetalert2';

const consultaPDF= () => {
 
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const  folioParam  = useParams();
  const resultParam=folioParam.folio
   useEffect(() => {
    dispatch(antecedentes_actions.read_AllAntecedentes());
  }, [dispatch]);

  const antecedentes = useSelector((store) => store.antecedentes.AllAntecedentes);
  
  const antecedenteFiltrado = Array.isArray(antecedentes)
  ? antecedentes?.filter(antecedente => antecedente?.folio === resultParam)
  : [];
  const nombre=antecedenteFiltrado?.map(antecedente=>antecedente.nombre.toUpperCase())
  
 
  const expedicion = antecedenteFiltrado.map(antecedente => antecedente.expedicion).toLocaleString()
const partes=expedicion.split('-')
const dia=partes[2]
const mes=partes[1]
const año=partes[0]
const fotoUrl = antecedenteFiltrado?.length > 0 ? antecedenteFiltrado[0].foto : null;
const huellaUrl = antecedenteFiltrado?.length > 0 ? antecedenteFiltrado[0].huella : null;


  function numeroALetras(numero) {
  if(numero === '01'){
    return 'Un'
  }
  if(numero === '02'){
    return 'dos'
  }
  if(numero === '03'){
    return 'tres'
  }
  if(numero === '04'){
    return 'cuatro'
  }
  if(numero === '05'){
    return 'cinco'
  }
  if(numero === '06'){
    return 'seis'
  }
  if(numero === '07' ){
    return 'siete'
  }
  if(numero === '08'){
    return 'ocho'
      }
  if(numero === '09'){
return 'nueve'
  }
  if(numero === '10'){
return 'diez'
  }
  if(numero === '11'){
    return 'once'
  }
  if(numero === '12'){
    return 'doce'
  }
  if(numero === '13'){
    return 'trece'
  }
  if(numero === '14'){
    return 'catorce'
  }
  if(numero ==='15'){
    return 'quince'
  }
  if(numero === '16'){
    return 'dieciséis'
  }
  if(numero === '17'){
    return 'Diecisiete'
  }
  if(numero === '18'){
 return 'dieciocho'
  }
  if(numero === '19'){
 return 'diecinueve'
  }
  if(numero === '20'){
return 'veinte'
  }
  if(numero === '21'){
return 'veintiun'
  }
  if(numero === '22'){
return 'veintidos'
  }
  if(numero === '23'){
 return 'veintitres'
  }
  if(numero === '24'){
return 'veinticuatro'
  }
  if(numero === '25'){
return 'veinticinco'
  }
  if(numero === '26'){
return 'veintiséis'
  }
  if(numero === '27'){
return 'veintisiete'
  }
  if(numero === '28'){
return 'veintiocho'
  }
  if(numero === '29'){
return 'veintinueve'
  }
  if(numero === '30'){
return 'treinta'
  }
  if(numero === '31'){
return 'treinta y un'
  }
}

function mesALetras(numero) {
  if(numero === '01'){
    return 'Enero'
    }
    if(numero === '02'){
      return 'Febrero'
      }
      if(numero === '03'){
        return 'Marzo'
        }
        if(numero === '04'){
          return 'Abril'
          }
          if(numero === '05'){
            return 'Mayo'
            }
            if(numero === '06'){
              return 'Junio'
              }
              if(numero === '07'){
                return 'Julio'
                }
                if(numero === '08'){
                  return 'Agosto'
                  }
                  if(numero === '09'){
                    return 'Septiembre'
                    }
                    if(numero === '10'){
                      return 'Octubre'
                      }
                      if(numero === '11'){
                        return 'Noviembre'
                        }
                        if(numero === '12'){
                          return 'Diciembre'
                          }

}
const nombreMes=mesALetras(mes)
const diaEnLetras=numeroALetras(dia)
const vigencia = antecedenteFiltrado.map(antecedente => antecedente.vigencia);

const formattedVigencia = vigencia.map(dateString => {
  const parts = dateString.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString; // Si no es un formato válido, se mantiene igual
});
const qrUrl = antecedenteFiltrado?.length > 0 ? antecedenteFiltrado[0].qr : null;
console.log(qrUrl);
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
      height: '12%', 
      position:'absolute',
      top:'25%',
      left:'6%'
    },
    sello: {
      width: '15%', // Ancho de la imagen
      height: '11.5%', 
      position:'absolute',
      top:'34%',
      left:'8%'
    },
    huella: {
      objectFit:'fill'
    },
    nombre: {
      position:'absolute',
      top:'49%',
      left:124,
      fontSize:12,
      fontFamily:'Helvetica-Bold',
      width:'57.5%',
      justifyContent:'center',
      flexDirection:'row'
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
   folioSup1: {
      position:'absolute',
      top:'16%',
      left:'86%',
      fontSize:3
    },
    folioSup2: {
      position:'absolute',
      top:'16%',
      left:'88.5%',
      fontSize:3
    },
    folioSup3: {
      position:'absolute',
      top:'16%',
      left:'91.5%',
      fontSize:3
    },
    folioSup4: {
      position:'absolute',
      top:'16%',
      left:'94%',
      fontSize:3
    },
    folioInf1: {
      position:'absolute',
      top:'18%',
      left:'86%',
      fontSize:3
    },
    folioInf2: {
      position:'absolute',
      top:'18%',
      left:'88.5%',
      fontSize:3
    },
    folioInf3: {
      position:'absolute',
      top:'18%',
      left:'91.5%',
      fontSize:3
    },
    folioInf4: {
      position:'absolute',
      top:'18%',
      left:'94%',
      fontSize:3
    },
    folioIzq: {
      position:'absolute',
      top:'17%',
      left:'84.7%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioDer: {
      position:'absolute',
      top:'17%',
      left:'95.4%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioQRSup1: {
      position:'absolute',
      top:'79.5%',
      left:'76%',
      fontSize:3
    },
    folioQRSup2: {
      position:'absolute',
      top:'79.5%',
      left:'78.2%',
      fontSize:3
    },
    folioQRSup3: {
      position:'absolute',
      top:'79.5%',
      left:'80.4%',
      fontSize:3
    },
    folioQRSup4: {
      position:'absolute',
      top:'79.5%',
      left:'82.5%',
      fontSize:3
    },
    folioQRSup5: {
      position:'absolute',
      top:'79.5%',
      left:'84.5%',
      fontSize:3
    },
    folioQRSup6: {
      position:'absolute',
      top:'79.5%',
      left:'86.5%',
      fontSize:3
    },
    folioQRSup7: {
      position:'absolute',
      top:'79.5%',
      left:'88.7%',
      fontSize:3
    },
    folioQRSup8: {
      position:'absolute',
      top:'79.5%',
      left:'90.8%',
      fontSize:3
    },
    folioQRSup9: {
      position:'absolute',
      top:'79.5%',
      left:'93%',
      fontSize:3
    },
    folioQRInf1: {
      position:'absolute',
      top:'95%',
      left:'76%',
      fontSize:3
    },
    folioQRInf2: {
      position:'absolute',
      top:'95%',
      left:'78.2%',
      fontSize:3
    },
    folioQRInf3: {
      position:'absolute',
      top:'95%',
      left:'80.4%',
      fontSize:3
    },
    folioQRInf4: {
      position:'absolute',
      top:'95%',
      left:'82.5%',
      fontSize:3
    },
    folioQRInf5: {
      position:'absolute',
      top:'95%',
      left:'84.5%',
      fontSize:3
    },
    folioQRInf6: {
      position:'absolute',
      top:'95%',
      left:'86.5%',
      fontSize:3
    },
    folioQRInf7: {
      position:'absolute',
      top:'95%',
      left:'88.7%',
      fontSize:3
    },
    folioQRInf8: {
      position:'absolute',
      top:'95%',
      left:'90.8%%',
      fontSize:3
    },
    folioQRInf9: {
      position:'absolute',
      top:'95%',
      left:'93%',
      fontSize:3
    },
    folioIzq1: {
      position:'absolute',
      top:'80.6%',
      left:'74.55%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioIzq2: {
      position:'absolute',
      top:'82.1%',
      left:'74.55%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioIzq3: {
      position:'absolute',
      top:'83.7%',
      left:'74.55%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioIzq4: {
      position:'absolute',
      top:'85.3%',
      left:'74.55%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioIzq5: {
      position:'absolute',
      top:'86.8%',
      left:'74.55%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioIzq6: {
      position:'absolute',
      top:'88.4%',
      left:'74.55%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioIzq7: {
      position:'absolute',
      top:'90%',
      left:'74.55%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioIzq8: {
      position:'absolute',
      top:'91.5%',
      left:'74.55%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioIzq9: {
      position:'absolute',
      top:'92.5%',
      left:'74.55%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioIzq10: {
      position:'absolute',
      top:'93.9%',
      left:'74.55%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioDer1: {
      position:'absolute',
      top:'80.6%',
      left:'94.5%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioDer2: {
      position:'absolute',
      top:'82.1%',
      left:'94.5%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioDer3: {
      position:'absolute',
      top:'83.7%',
      left:'94.5%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioDer4: {
      position:'absolute',
      top:'85.3%',
      left:'94.5%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioDer5: {
      position:'absolute',
      top:'86.8%',
      left:'94.5%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioDer6: {
      position:'absolute',
      top:'88.4%',
      left:'94.5%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioDer7: {
      position:'absolute',
      top:'90%',
      left:'94.5%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioDer8: {
      position:'absolute',
      top:'91.5%',
      left:'94.5%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioDer9: {
      position:'absolute',
      top:'92.5%',
      left:'94.5%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    folioDer10: {
      position:'absolute',
      top:'93.9%',
      left:'94.5%',
      fontSize:3,
      transform: 'rotate(90deg)'
    },
    Recibo:{
    position:'absolute',
    top:'82.7%',
    fontSize:13,
    left:'40%'
    },
    a:{
      position:'absolute',
      top:'82.7%',
      fontSize:13,
      left:'40%'
      },
      año:{
        position:'absolute',
        top:'58.7%',
        left:'60%',
        fontSize:9.5
      },
      t1:{
      position:'absolute',
      fontSize:10.1,
      top:203,
      left:125
      },
      t2:{
        position:'absolute',
        fontSize:10.1,
        top:214,
        left:125
      },
      t3:{
        position:'absolute',
        fontSize:8.3,
        top:192,
        right:49
      },
      t4:{
        position:'absolute',
        fontSize:8.2,
        top:225,
        right:37
      },
      t5:{
        position:'absolute',
        fontSize:8.2,
        top:239,
        right:49
      },
      escudo:{
        position:'absolute',
        width:'66%',
        top:232,
        left:111
      },
      t6:{
        position:'absolute',
        fontSize:18.5,
        top:295,
        left:230
      },
      t7:{
        position:'absolute',
        fontSize:11.2,
        top:328,
        left:125
      },
      t8:{
        position:'absolute',
        fontSize:10.5,
        top:339,
        left:125
      },
      t9:{
        position:'absolute',
        fontSize:10.7,
        top:349,
        left:125
      },
      t10:{
        position:'absolute',
        fontSize:11,
        top:349,
        left:400,
        fontFamily:'Helvetica-Bold'
      },
      t11:{
        position:'absolute',
        fontSize:11,
        top:360,
        left:125,
        fontFamily:'Helvetica-Bold'
      },
      t12:{
        position:'absolute',
        fontSize:10.7,
        top:360,
        left:273,
      },
      gray:{
        position:'absolute',
        width:'66%',
        top:232,
        left:111,
        height:405,
        backgroundColor:'#ffffffb2'
      },
      t13:{
      position:'absolute',
      top:428.5,
      fontSize:10.3,
      left:126.5
      },
      t14:{
        position:'absolute',
        top:439,
        fontSize:10.3,
        left:126.5
        },
        t15:{
          position:'absolute',
          top:451,
          fontSize:10.3,
          left:126.5
          },
          t16:{
            position:'absolute',
            top:464,
          fontSize:10.3,
          left:126.5
            },
            t17:{
              position:'absolute',
              top:476,
              fontSize:10.3,
              left:126.5
              },
              firma2:{
                position:'absolute',
                width:'25%',
                top:510,
                right:80
              },
              lic:{
              position:'absolute',
              top:585,
              right:75,
              fontSize:9.7
              },
              lic2:{
                position:'absolute',
                top:595,
                right:96,
                fontSize:8
              },
              firma1:{
                position:'absolute',
                width:'18%',
                top:527,
                left:85
              },
              mrta:{
                position:'absolute',
                fontSize:9.7,
                top:585,
                left:75
              },
              mrta2:{
                position:'absolute',
                top:595,
                left:87,
                fontSize:8
              },
              mrta3:{
                position:'absolute',
                top:604,
                left:117,
                fontSize:8
              },
              dere:{
                position:'absolute',
                top:657,
                left:59,
                fontSize:10
              },
              impor:{
                position:'absolute',
                top:680,
                left:32,
                fontSize:9.5,
                color:'#df5900'
              },
              impor2:{
                position:'absolute',
                top:680,
                left:100,
                fontSize:9,
                },
                vigenciaa:{
                  position:'absolute',
                  top:732,
                  left:60,
                  fontSize:10,
                  fontFamily:'Helvetica-Bold'
                },
                escudo2:{
                position:'absolute',
                width:'10%',
                right:18,
                top:355
                },
                conthuella:{
                border:2,
                borderColor:'black',
                width: '10%', // Ancho de la imagen
                height: '10%', 
                position:'absolute',
                top:'47.7%',
                left:37,
                objectFit:'fill',
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center'
                }

  });
  function generarNumeroAleatorio() {
    const min = 1000000; // El número mínimo de 7 cifras
    const max = 9999999; // El número máximo de 7 cifras
    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    return numeroAleatorio;
  }
  
  const numeroRandom = generarNumeroAleatorio();

  function generateDownloadLink() {
    return (
      <PDFDownloadLink
        document={<Document title={`${folio}_${nombre}_NO_TIENE_ANTECEDENTES.pdf`}>
          <Page size="LETTER">
          <View >
    <Image style={styles.image} src={{ uri:'https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/formatolimpio.jpg?alt=media&token=14a622e0-82d3-4214-8fca-a2538a27201a' , method: 'GET'}}/>
    <Image style={styles.escudo} src={{ uri:'https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/escudoremove.png?alt=media&token=af85ed12-e2e6-426f-8e5c-75c8f31ec21a' , method: 'GET'}}/>
    <View style={styles.gray}></View>
    <Image style={styles.foto} src={{ uri:`${fotoUrl}` , method: 'GET'}}/>
    <View style={styles.conthuella}><Image style={styles.huella} src={{ uri:`${huellaUrl}` , method: 'GET'}}/></View>
    <Image style={styles.sello} src={{ uri:`https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/sello.png?alt=media&token=ed7f4aa2-a922-4e61-b6e5-8a1601c76d08` , method: 'GET'}}/>
    <View style={styles.nombre}><Text >{nombre}</Text></View>
    <View style={styles.qrContainer}>
    <Image style={styles.qr} src={{ uri:`${qrUrl}` , method: 'GET'}}/>
    </View>
    <Text style={styles.folioRojo}>{folio}</Text>
    {/* ESTO ES PARA LOS MARCOS DEL FOLIO ROJO */}
    <Text style={styles.folioSup1}>{folio}</Text>
    <Text style={styles.folioSup2}>{folio}</Text>
    <Text style={styles.folioSup3}>{folio}</Text>
    <Text style={styles.folioSup4}>{folio}</Text>

    <Text style={styles.folioInf1}>{folio}</Text>
    <Text style={styles.folioInf2}>{folio}</Text>
    <Text style={styles.folioInf3}>{folio}</Text>
    <Text style={styles.folioInf4}>{folio}</Text>

    <Text style={styles.folioIzq}>{folio}</Text>
    <Text style={styles.folioDer}>{folio}</Text>
    {/*----------------------------------------*/}
    {/* ESTO ES PARA LOS MARCOS DEL QR */}
    <Text style={styles.folioQRSup1}>{folio}</Text>
    <Text style={styles.folioQRSup2}>{folio}</Text>
    <Text style={styles.folioQRSup3}>{folio}</Text>
    <Text style={styles.folioQRSup4}>{folio}</Text>
    <Text style={styles.folioQRSup5}>{folio}</Text>
    <Text style={styles.folioQRSup6}>{folio}</Text>
    <Text style={styles.folioQRSup7}>{folio}</Text>
    <Text style={styles.folioQRSup8}>{folio}</Text>
    <Text style={styles.folioQRSup9}>{folio}</Text>

    <Text style={styles.folioQRInf1}>{folio}</Text>
    <Text style={styles.folioQRInf2}>{folio}</Text>
    <Text style={styles.folioQRInf3}>{folio}</Text>
    <Text style={styles.folioQRInf4}>{folio}</Text>
    <Text style={styles.folioQRInf5}>{folio}</Text>
    <Text style={styles.folioQRInf6}>{folio}</Text>
    <Text style={styles.folioQRInf7}>{folio}</Text>
    <Text style={styles.folioQRInf8}>{folio}</Text>
    <Text style={styles.folioQRInf9}>{folio}</Text>

    <Text style={styles.folioIzq1}>{folio}</Text>
    <Text style={styles.folioIzq2}>{folio}</Text>
    <Text style={styles.folioIzq3}>{folio}</Text>
    <Text style={styles.folioIzq4}>{folio}</Text>
    <Text style={styles.folioIzq5}>{folio}</Text>
    <Text style={styles.folioIzq6}>{folio}</Text>
    <Text style={styles.folioIzq7}>{folio}</Text>
    <Text style={styles.folioIzq8}>{folio}</Text>
    <Text style={styles.folioIzq9}>{folio}</Text>
    <Text style={styles.folioIzq10}>{folio}</Text>
    

    <Text style={styles.folioDer1}>{folio}</Text>
    <Text style={styles.folioDer2}>{folio}</Text>
    <Text style={styles.folioDer3}>{folio}</Text>
    <Text style={styles.folioDer4}>{folio}</Text>
    <Text style={styles.folioDer5}>{folio}</Text>
    <Text style={styles.folioDer6}>{folio}</Text>
    <Text style={styles.folioDer7}>{folio}</Text>
    <Text style={styles.folioDer8}>{folio}</Text>
    <Text style={styles.folioDer9}>{folio}</Text>
    <Text style={styles.folioDer10}>{folio}</Text>
    <Text style={styles.Recibo}>{numeroRandom}</Text>
    <Text style={styles.t1}>El Consejo de la Judicatura del Poder Judicial del Estado de Chiapas a través de la</Text>
    <Text style={styles.t2}>Secretaría Ejecutiva.</Text>
    <Text style={styles.t3}>Oficina: 00000001</Text>
    <Text style={styles.t4}>Pago por derecho</Text>
    <Text style={styles.t5}>$ 370.00</Text>
    <Text style={styles.t6}>HACE CONSTAR</Text>
    <Text style={styles.t7}>Que una vez revisados los registros de la base de datos del Tribunal</Text>
    <Text style={styles.t8}>Superior de Justicia del Estado, en los términos del artículo 349 del Código</Text>
    <Text style={styles.t9}>de Proce dimientos Penales vigentes en la entidad,</Text>
    <Text style={styles.t10}>NO EXISTEN</Text>
    <Text style={styles.t11}>ANTECEDENTES PENALES </Text>
    <Text style={styles.t12}>del (la):</Text>
    <Text style={styles.t13}>Cuya fotografía y huella dactilar aparece al margen superior izquierdo, a</Text>
    <Text style={styles.t14}>solicitud de la parte interesada y para los usos legales a que haya lugar,</Text>
    <Text style={styles.t15}>se     extiende     la     presente     certificación     a     los     {diaEnLetras?.toUpperCase()}</Text>
    <Text style={styles.t16}>DIAS       del       mes       de       {nombreMes}       del       {año},       en       la </Text>
    <Text style={styles.t17}>ciudad de Tuxtla Gutierrez, Chiapas México.</Text>
    <Image style={styles.firma2} src={{ uri:`https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/DISMAR%203.png?alt=media&token=e71bcce0-66b4-4bef-bbd9-05b02ed939a6` , method: 'GET'}}/>
    <Text style={styles.lic}>Lic. Otilia Getsemani Molina Tovilla</Text>
    <Text style={styles.lic2}>Responsable de la Búsqueda</Text>
    <Image style={styles.firma1} src={{ uri:`https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/DISMAR%202.png?alt=media&token=eb38f9ba-58ce-466d-99bc-8c3e75c272de` , method: 'GET'}}/>
    <Text style={styles.mrta}>Mtra. Patricia Recinos Hernández</Text>
    <Text style={styles.mrta2}>Secretaria Ejecutiva del Consejo</Text>
    <Text style={styles.mrta3}>de la Judicatura</Text>
    <Text style={styles.dere}>Derechos pagados con recibo oficial no: </Text>
    <Text style={styles.impor}>IMPORTANTE:</Text>
    <Text style={styles.impor2}>Valida la autenticidad del documento con tu dispositivo móvil a travez del código QR</Text>
    <Text style={styles.vigenciaa}>Esta constancia tiene una vigencia hasta el día {formattedVigencia}</Text>
    <Image style={styles.escudo2} src={{ uri:`https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/DISMAR%201.png?alt=media&token=ee878bba-f5f5-4e7d-8d29-01b0af8752f0` , method: 'GET'}}/>
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
  useEffect(() => {
    let timerInterval;
    Swal.fire({
      title: "Generando PDF",
      html: "Espera mientras se genera el PDF",
      timer: 10000,
      timerProgressBar: true,
      showLoaderOnConfirm:true,
      imageWidth:'100%',
      color:'white',
      background:'#0C0C0C',
    showConfirmButton:false,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
        setFinish(true)
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  }, []);
return (
  <>
  <Anchor to={'/panelAdmin'} className='bg-[#00ff22] text-[black] p-1 lg:w-[10%] w-[40%] h-auto text-center rounded-[5px] absolute top-[1.7%] sm:left-[70%] left-[10%]'>Regresar al Panel</Anchor>
  <button className='bg-[#df5900] text-[white] p-1 lg:w-[10%] w-[40%] text-center rounded-[5px] absolute top-[1.7%] sm:left-[87%] left-[50%]'>
   {generateDownloadLink()} {/* Renderiza el enlace de descarga */} 
  </button>
  
   
<PDFViewer className='w-full h-screen'>

<Document title={`${folio}_${nombre}_NO_TIENE_ANTECEDENTES.pdf`}>
<Page size="LETTER"  >
<View >
    <Image style={styles.image} src={{ uri:'https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/formatolimpio.jpg?alt=media&token=14a622e0-82d3-4214-8fca-a2538a27201a' , method: 'GET'}}/>
    <Image style={styles.escudo} src={{ uri:'https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/escudoremove.png?alt=media&token=af85ed12-e2e6-426f-8e5c-75c8f31ec21a' , method: 'GET'}}/>
    <View style={styles.gray}></View>
    <Image style={styles.foto} src={{ uri:`${fotoUrl}` , method: 'GET'}}/>
    <View style={styles.conthuella}><Image style={styles.huella} src={{ uri:`${huellaUrl}` , method: 'GET'}}/></View>
    <Image style={styles.sello} src={{ uri:`https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/sello.png?alt=media&token=ed7f4aa2-a922-4e61-b6e5-8a1601c76d08` , method: 'GET'}}/>
    <View style={styles.nombre}><Text >{nombre}</Text></View>
    <View style={styles.qrContainer}>
    <Image style={styles.qr} src={{ uri:`${qrUrl}` , method: 'GET'}}/>
    </View>
    <Text style={styles.folioRojo}>{folio}</Text>
    {/* ESTO ES PARA LOS MARCOS DEL FOLIO ROJO */}
    <Text style={styles.folioSup1}>{folio}</Text>
    <Text style={styles.folioSup2}>{folio}</Text>
    <Text style={styles.folioSup3}>{folio}</Text>
    <Text style={styles.folioSup4}>{folio}</Text>

    <Text style={styles.folioInf1}>{folio}</Text>
    <Text style={styles.folioInf2}>{folio}</Text>
    <Text style={styles.folioInf3}>{folio}</Text>
    <Text style={styles.folioInf4}>{folio}</Text>

    <Text style={styles.folioIzq}>{folio}</Text>
    <Text style={styles.folioDer}>{folio}</Text>
    {/*----------------------------------------*/}
    {/* ESTO ES PARA LOS MARCOS DEL QR */}
    <Text style={styles.folioQRSup1}>{folio}</Text>
    <Text style={styles.folioQRSup2}>{folio}</Text>
    <Text style={styles.folioQRSup3}>{folio}</Text>
    <Text style={styles.folioQRSup4}>{folio}</Text>
    <Text style={styles.folioQRSup5}>{folio}</Text>
    <Text style={styles.folioQRSup6}>{folio}</Text>
    <Text style={styles.folioQRSup7}>{folio}</Text>
    <Text style={styles.folioQRSup8}>{folio}</Text>
    <Text style={styles.folioQRSup9}>{folio}</Text>

    <Text style={styles.folioQRInf1}>{folio}</Text>
    <Text style={styles.folioQRInf2}>{folio}</Text>
    <Text style={styles.folioQRInf3}>{folio}</Text>
    <Text style={styles.folioQRInf4}>{folio}</Text>
    <Text style={styles.folioQRInf5}>{folio}</Text>
    <Text style={styles.folioQRInf6}>{folio}</Text>
    <Text style={styles.folioQRInf7}>{folio}</Text>
    <Text style={styles.folioQRInf8}>{folio}</Text>
    <Text style={styles.folioQRInf9}>{folio}</Text>

    <Text style={styles.folioIzq1}>{folio}</Text>
    <Text style={styles.folioIzq2}>{folio}</Text>
    <Text style={styles.folioIzq3}>{folio}</Text>
    <Text style={styles.folioIzq4}>{folio}</Text>
    <Text style={styles.folioIzq5}>{folio}</Text>
    <Text style={styles.folioIzq6}>{folio}</Text>
    <Text style={styles.folioIzq7}>{folio}</Text>
    <Text style={styles.folioIzq8}>{folio}</Text>
    <Text style={styles.folioIzq9}>{folio}</Text>
    <Text style={styles.folioIzq10}>{folio}</Text>
    

    <Text style={styles.folioDer1}>{folio}</Text>
    <Text style={styles.folioDer2}>{folio}</Text>
    <Text style={styles.folioDer3}>{folio}</Text>
    <Text style={styles.folioDer4}>{folio}</Text>
    <Text style={styles.folioDer5}>{folio}</Text>
    <Text style={styles.folioDer6}>{folio}</Text>
    <Text style={styles.folioDer7}>{folio}</Text>
    <Text style={styles.folioDer8}>{folio}</Text>
    <Text style={styles.folioDer9}>{folio}</Text>
    <Text style={styles.folioDer10}>{folio}</Text>
    <Text style={styles.Recibo}>{numeroRandom}</Text>
    <Text style={styles.t1}>El Consejo de la Judicatura del Poder Judicial del Estado de Chiapas a través de la</Text>
    <Text style={styles.t2}>Secretaría Ejecutiva.</Text>
    <Text style={styles.t3}>Oficina: 00000001</Text>
    <Text style={styles.t4}>Pago por derecho</Text>
    <Text style={styles.t5}>$ 370.00</Text>
    <Text style={styles.t6}>HACE CONSTAR</Text>
    <Text style={styles.t7}>Que una vez revisados los registros de la base de datos del Tribunal</Text>
    <Text style={styles.t8}>Superior de Justicia del Estado, en los términos del artículo 349 del Código</Text>
    <Text style={styles.t9}>de Proce dimientos Penales vigentes en la entidad,</Text>
    <Text style={styles.t10}>NO EXISTEN</Text>
    <Text style={styles.t11}>ANTECEDENTES PENALES </Text>
    <Text style={styles.t12}>del (la):</Text>
    <Text style={styles.t13}>Cuya fotografía y huella dactilar aparece al margen superior izquierdo, a</Text>
    <Text style={styles.t14}>solicitud de la parte interesada y para los usos legales a que haya lugar,</Text>
    <Text style={styles.t15}>se     extiende     la     presente     certificación     a     los     {diaEnLetras?.toUpperCase()}</Text>
    <Text style={styles.t16}>DIAS       del       mes       de       {nombreMes}       del       {año},       en       la </Text>
    <Text style={styles.t17}>ciudad de Tuxtla Gutierrez, Chiapas México.</Text>
    <Image style={styles.firma2} src={{ uri:`https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/DISMAR%203.png?alt=media&token=e71bcce0-66b4-4bef-bbd9-05b02ed939a6` , method: 'GET'}}/>
    <Text style={styles.lic}>Lic. Otilia Getsemani Molina Tovilla</Text>
    <Text style={styles.lic2}>Responsable de la Búsqueda</Text>
    <Image style={styles.firma1} src={{ uri:`https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/DISMAR%202.png?alt=media&token=eb38f9ba-58ce-466d-99bc-8c3e75c272de` , method: 'GET'}}/>
    <Text style={styles.mrta}>Mtra. Patricia Recinos Hernández</Text>
    <Text style={styles.mrta2}>Secretaria Ejecutiva del Consejo</Text>
    <Text style={styles.mrta3}>de la Judicatura</Text>
    <Text style={styles.dere}>Derechos pagados con recibo oficial no: </Text>
    <Text style={styles.impor}>IMPORTANTE:</Text>
    <Text style={styles.impor2}>Valida la autenticidad del documento con tu dispositivo móvil a travez del código QR</Text>
    <Text style={styles.vigenciaa}>Esta constancia tiene una vigencia hasta el día {formattedVigencia}</Text>
    <Image style={styles.escudo2} src={{ uri:`https://firebasestorage.googleapis.com/v0/b/antecedentes-chiapas.appspot.com/o/DISMAR%201.png?alt=media&token=ee878bba-f5f5-4e7d-8d29-01b0af8752f0` , method: 'GET'}}/>
    </View>
  </Page>
</Document>
       
</PDFViewer>
  
 
  </>

  );
};

export default consultaPDF;
