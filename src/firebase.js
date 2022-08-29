// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGENja4ZLO1xWQ2gWwBEiX73hw3YbY_Xw",
  authDomain: "newest-34ef2.firebaseapp.com",
  projectId: "newest-34ef2",
  storageBucket: "newest-34ef2.appspot.com",
  messagingSenderId: "838950995011",
  appId: "1:838950995011:web:e38044506c9c09056640f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const projectsColRef = collection(db, 'projects');
export default projectsColRef;