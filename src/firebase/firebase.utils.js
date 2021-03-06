import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDLA9WEnAvRask4y3ECs6kH4K5pwjJF2UE",
  authDomain: "crwn-db-23683.firebaseapp.com",
  databaseURL: "https://crwn-db-23683.firebaseio.com",
  projectId: "crwn-db-23683",
  storageBucket: "crwn-db-23683.appspot.com",
  messagingSenderId: "545250749812",
  appId: "1:545250749812:web:965c345a8fdf42a9dcd021",
  measurementId: "G-MGPFPP5X61",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
