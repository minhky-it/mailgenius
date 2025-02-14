import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfiguration = {
    apiKey: "AIzaSyA1UM88USiVqgAaiodpud67V7kQIrpDgeA",
    authDomain: "mailgeniusauthenticate.firebaseapp.com",
    projectId: "mailgeniusauthenticate",
    storageBucket: "mailgeniusauthenticate.firebasestorage.app",
    messagingSenderId: "602505302994",
    appId: "1:602505302994:web:33662ce551d2b755e12e0b",
    measurementId: "G-9YST4473P6"
}

const app = initializeApp(firebaseConfiguration);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
    auth,
    provider,
    app as firebaseApp,
}