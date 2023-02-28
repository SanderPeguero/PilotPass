import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDepCq142fQCdSwyHRXpAA7l2BCXnlCySM",
    authDomain: "quiz-by-sander.firebaseapp.com",
    databaseURL: "https://quiz-by-sander-default-rtdb.firebaseio.com",
    projectId: "quiz-by-sander",
    storageBucket: "quiz-by-sander.appspot.com",
    messagingSenderId: "276041567816",
    appId: "1:276041567816:web:9ed7dd86c27d906689d27d",
    measurementId: "G-EGYRBETVD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = (app);

//Mantenerse pendiente a los cambios de los datos en la base de datos y actualizar los de la aplicacion
const db = getDatabase();

//Leer los datos una sola vez
// const dbRef = ref(getDatabase());




export  { auth, db };