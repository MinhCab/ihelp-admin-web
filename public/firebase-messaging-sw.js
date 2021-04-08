// importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js')
// importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js')

// firebase.initializeApp({
//   messagingSenderId: '825916469639'
// })

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register(".firebase-messaging-sw.js")
//     .then(function (registration) {
//       console.log("Registration successful, scope is:", registration.scope);
//     })
//     .catch(function (err) {
//       console.log("Service worker registration failed, error:", err);
//     });
// }

// firebase.messaging()

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDBoLp2pjwAX_TZ8ELvX8TimsRZNr1wgn8",
  authDomain: "ihelp-307104.firebaseapp.com",
  projectId: "ihelp-307104",
  storageBucket: "ihelp-307104.appspot.com",
  messagingSenderId: "825916469639",
  appId: "1:825916469639:web:29f08e5316fc9570d2a322",
  measurementId: "G-C1XXY1X8SE"
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