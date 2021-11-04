import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsRc3cN-UqW_1XsSWKHsVfuEWO1GXyPxc",
  authDomain: "slack-clone-a9657.firebaseapp.com",
  projectId: "slack-clone-a9657",
  storageBucket: "slack-clone-a9657.appspot.com",
  messagingSenderId: "853543159056",
  appId: "1:853543159056:web:c5322ead69e73abc625195",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
