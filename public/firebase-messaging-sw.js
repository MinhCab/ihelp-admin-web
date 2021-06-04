importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBDN2QHUsyhQOsjqjpuyq8-OpSBuFApyQQ",
  authDomain: "ihelp-renew.firebaseapp.com",
  projectId: "ihelp-renew",
  storageBucket: "ihelp-renew.appspot.com",
  messagingSenderId: "154243439745",
  appId: "1:154243439745:web:58e9e8d35b8757cbfa8180",
  measurementId: "G-56N3XJ48C2"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});