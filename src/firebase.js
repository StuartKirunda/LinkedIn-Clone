// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import { getDatabase, ref } from "firebase/database";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

    apiKey: "AIzaSyD52eIkBSyaaUi_aBgESc3rhYtmNUM3waY",

    authDomain: "linkedinclone-9dea0.firebaseapp.com",

    projectId: "linkedinclone-9dea0",

    storageBucket: "linkedinclone-9dea0.appspot.com",

    messagingSenderId: "686824376469",

    appId: "1:686824376469:web:c23fbff2dff6d17df4339c"

};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);
// const reference = ref(db, 'articles');
// const signin = signInWithPopup(auth, provider);

export { auth, provider, storage };
export default db;
