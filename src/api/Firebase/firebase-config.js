import firebase from 'firebase/app'
import 'firebase/storage'
import '@firebase/messaging'
import { useAuth } from '../../hoc/StoringAuth/AuthContext';

const firebaseConfig = {
    apiKey: "AIzaSyDBoLp2pjwAX_TZ8ELvX8TimsRZNr1wgn8",
    authDomain: "ihelp-307104.firebaseapp.com",
    projectId: "ihelp-307104",
    storageBucket: "ihelp-307104.appspot.com",
    messagingSenderId: "825916469639",
    appId: "1:825916469639:web:29f08e5316fc9570d2a322",
    measurementId: "G-C1XXY1X8SE"
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