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

  // Storing userAuth data in firestore

  export const createUserProfileDocument = async ( userAuth, additionalData) => {
    // console.log(additionalData); Display name comes as additional data while signing up the user.
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`); // This gives document reference.
    const snapShot = await userRef.get(); // This gives document snapshot.
    
    // console.log(snapShot);
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        //console.log(displayName); displayName at this stage is null while signing up the user.
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('Error creatign user', error.message);
        }
    }

    return userRef;

  }

  

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;