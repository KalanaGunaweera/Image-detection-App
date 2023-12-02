import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBCCfpYfw-7iirNHkV08p6kV9jizeYs1c8",
    authDomain: "web-challenge-a0d9c.firebaseapp.com",
    projectId: "web-challenge-a0d9c",
    storageBucket: "web-challenge-a0d9c.appspot.com",
    messagingSenderId: "265585495664",
    appId: "1:265585495664:web:b4180b92949fc879caeeb5"
  };

  //init firebase 
  firebase.initializeApp(firebaseConfig)

  //init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  //timestamp 
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  

export {projectFirestore,projectAuth,projectStorage, timestamp}