import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4TsiKT_BZb7W5BxgnW4S1syzUyfIrJHE",
  authDomain: "voice-8ddf6.firebaseapp.com",
  databaseURL: "https://voice-8ddf6.firebaseio.com",
  projectId: "voice-8ddf6",
  storageBucket: "voice-8ddf6.appspot.com",
  messagingSenderId: "604410782430",
  appId: "1:604410782430:web:2f7d4d8ea0de0f8dcb584f"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
