// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'

const firebaseConfig = {
    apiKey: "AIzaSyBi0hJaiJ0wpHWOgVSZxtVsTS4uAoRcoys",
    authDomain: "antecedentes-chiapas.firebaseapp.com",
    projectId: "antecedentes-chiapas",
    storageBucket: "antecedentes-chiapas.appspot.com",
    messagingSenderId: "656334257987",
    appId: "1:656334257987:web:6d7703782a70d62a21f9f6",
    measurementId: "G-RTYGTEWMEB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)

export async function uploadQr(file) {
    const storageRef = ref(storage, `qr/${v4()}`);
  
    try {
      // Subir el archivo a Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
  
      // Obtener la URL de descarga del archivo
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      console.log( downloadURL);
      
      return downloadURL; // Devolver la URL de descarga
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
      throw error;
    }
  }