import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDy96DheSGb3Nh04aJEJV0_ZMIKLdYfpvo",
    authDomain: "empleados-b142d.firebaseapp.com",
    projectId: "empleados-b142d",
    storageBucket: "empleados-b142d.appspot.com",
    messagingSenderId: "813823548611",
    appId: "1:813823548611:web:9c7fbc06e40733e424d676",
    measurementId: "G-QQC824P31J"
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
