import firebase from 'firebase/app'
import 'firebase/storage'
import '@firebase/messaging'

// //ihelp-renew
const firebaseConfig = {
    apiKey: "AIzaSyBDN2QHUsyhQOsjqjpuyq8-OpSBuFApyQQ",
    authDomain: "ihelp-renew.firebaseapp.com",
    projectId: "ihelp-renew",
    storageBucket: "ihelp-renew.appspot.com",
    messagingSenderId: "154243439745",
    appId: "1:154243439745:web:58e9e8d35b8757cbfa8180",
    measurementId: "G-56N3XJ48C2"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

const messaging = firebase.messaging()

const askForNotificationPermission = async() => {
    await messaging.requestPermission().then(firebaseToken => {
        return messaging.getToken()
    }).then(token => {
        console.log('Firebase Token: ' + token)
        document.cookie = 'deviceToken=' + token
        return token
    }).catch(err => {
        console.log('is there any error: ' + err)
    })
}

export { storage, askForNotificationPermission, messaging, firebase }