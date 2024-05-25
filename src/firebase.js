// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcI3b-ylaOU92mDrjqXehkgVvad2JH4Dc",
  authDomain: "react-apple-tv-fd8dd.firebaseapp.com",
  projectId: "react-apple-tv-fd8dd",
  storageBucket: "react-apple-tv-fd8dd.appspot.com",
  messagingSenderId: "233810813561",
  appId: "1:233810813561:web:542ba9a5242f61828b2aa8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app) // auth 모듈 초기화

export const googleProvider = new GoogleAuthProvider();

export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://react-apple-tv-fd8dd.firebaseapp.com/__/auth/action?mode=action&oobCode=code',
  // This must be true.
  handleCodeInApp: true,
  // iOS: {
  //   bundleId: 'com.example.ios'
  // },
  // android: {
  //   packageName: 'com.example.android',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
  // dynamicLinkDomain: 'example.page.link'
};
console.log('connected firebase ✅')
export { app, auth };