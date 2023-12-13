// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyDzDDGq2RoayZq7J1VRRZxVHJ5X2mU6710",
    authDomain: "chainwork-e7f4c.firebaseapp.com",
    projectId: "chainwork-e7f4c",
    storageBucket: "chainwork-e7f4c.appspot.com",
    messagingSenderId: "893273606421",
    appId: "1:893273606421:web:5dcd8ed5f710fd2e85811c",
};

firebase.initializeApp(firebaseConfig);

self.showNotification = function(title, body, icon) {
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
    });
  };
  