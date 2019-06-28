import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export let db: firebase.firestore.Firestore | null = null;
export let providerGoogle: firebase.auth.GoogleAuthProvider | null = null;
if (process.env.NODE_ENV === "production") {
  const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_ID
  };
  firebase.initializeApp(config);
  db = firebase.firestore();
  providerGoogle = new firebase.auth.GoogleAuthProvider();
}
export default firebase;
