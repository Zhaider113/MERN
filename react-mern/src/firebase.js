// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getMessaging, getToken, onMessage } from "firebase/messaging";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { showNotification } from "firebase/messaging/sw";
// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDzDDGq2RoayZq7J1VRRZxVHJ5X2mU6710",
//   authDomain: "chainwork-e7f4c.firebaseapp.com",
//   projectId: "chainwork-e7f4c",
//   storageBucket: "chainwork-e7f4c.appspot.com",
//   messagingSenderId: "893273606421",
//   appId: "1:893273606421:web:5dcd8ed5f710fd2e85811c",
//   measurementId: "G-HJP9R4EK4B"
// };

// // // Initialize Firebase
// // const firebaseApp = initializeApp(firebaseConfig);
// // const messaging = getMessaging(firebaseApp);

// // export const getFirebaseToken = () => {
// //     return getToken(messaging, {vapidKey: 'BAf7i_J70pe4asBWTr-CbnJwqpE8LWraOtnB4gzmf66wWEdsDyWgG_lp-fbNw7ZBDiE7NFUGVqyK_y2rs4FkXDU'}).then((currentToken) => {
// //       if (currentToken) {
// //         console.log('current token for client: ', currentToken);
       
// //         // setTokenFound(true);
// //         // Track the token -> client mapping, by sending to backend server
// //         // show on the UI that permission is secured
// //       } else {
// //         console.log('No registration token available. Request permission to generate one.');
// //         // setTokenFound(false);
// //         // shows on the UI that permission is required 
// //       }
// //     }).catch((err) => {
// //       console.log('An error occurred while retrieving token. ', err);
// //       // catch error while creating client token
// //     });
// //   }
// //   export const onMessageListener = () =>
// //   new Promise((resolve) => {
// //     onMessage(messaging, (payload) => {
// //       resolve(payload);
// //     });
// // });
// // console.log(firebaseApp)

// // export {
// //   firebaseApp, 
// //   messaging
// // }

// const firebaseApp = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebaseApp);
// const getFirebaseToken = async () => {
//     try {
//       const currentToken = await getToken(messaging, { vapidKey: 'BAf7i_J70pe4asBWTr-CbnJwqpE8LWraOtnB4gzmf66wWEdsDyWgG_lp-fbNw7ZBDiE7NFUGVqyK_y2rs4FkXDU' });
//       if (currentToken) {
//         console.log('current token for client: ', currentToken);
//         // Send the token to your backend server
//       } else {
//         console.log('No registration token available. Request permission to generate one.');
//       }
//     } catch (err) {
//       console.log('An error occurred while retrieving token. ', err);
//     }
//   };
  
//   getFirebaseToken();
//   onMessage(messaging, (payload) => {
//     console.log('Received background message: ', payload);
  
//     const notificationTitle = payload.notification.title;
//     const notificationBody = payload.notification.body;
  
//     showNotification(messaging, {
//       title: notificationTitle,
//       body: notificationBody,
//       icon: 'firebase-logo.png',
//     });
//   });
    