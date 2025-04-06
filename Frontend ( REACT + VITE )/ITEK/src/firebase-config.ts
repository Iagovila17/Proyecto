// firebase-config.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC-xCCNx03pZLkQugjxVh3QS-yYXEIsQXg",
  authDomain: "itek-331a2.firebaseapp.com",
  projectId: "itek-331a2",
  storageBucket: "itek-331a2.appspot.com",
  messagingSenderId: "310862186734",
  appId: "1:310862186734:web:0169aea309888a24690bff",
};

// Inicializa Firebase
const appFirebase = initializeApp(firebaseConfig);

// Servicios de Firebase
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

// Exportación de servicios para uso en otros módulos
export { auth, db, storage };

