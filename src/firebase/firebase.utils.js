import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBiCDBZg3HTChJPIRbSPDWOJ4Gv-GZj940",
    authDomain: "crwn-db-practice.firebaseapp.com",
    databaseURL: "https://crwn-db-practice.firebaseio.com",
    projectId: "crwn-db-practice",
    storageBucket: "crwn-db-practice.appspot.com",
    messagingSenderId: "199882587096",
    appId: "1:199882587096:web:8329514c5a425790ed90ad",
    measurementId: "G-T7YGBPW2LD"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;