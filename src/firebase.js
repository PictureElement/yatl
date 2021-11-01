// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJY00JCqY8JWJVGvgAvG0ce61K3-Is8SM",
  authDomain: "todo-react-d871c.firebaseapp.com",
  projectId: "todo-react-d871c",
  storageBucket: "todo-react-d871c.appspot.com",
  messagingSenderId: "609439581120",
  appId: "1:609439581120:web:fffab6966e67e33faffe25",
  measurementId: "G-9VBBB55DPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const analytics = getAnalytics(app);
const auth = getAuth();

// export function signout() {
//   signOut(auth).then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//   });
// }

// Export Firestore and Authentication
export { db, auth };

