import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD1T-jZdhtTXd5578cXgqdkV7D7awi0sRA",
    authDomain: "ihelp-307104.firebaseapp.com",
    projectId: "ihelp-307104",
    storageBucket: "ihelp-307104.appspot.com",
    messagingSenderId: "825916469639",
    appId: "1:825916469639:web:29f08e5316fc9570d2a322",
    measurementId: "G-C1XXY1X8SE"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }