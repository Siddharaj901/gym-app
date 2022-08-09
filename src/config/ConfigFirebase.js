// database/firebaseDb.js

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "REPLACE_HERE",
  authDomain: "REPLACE_HERE",
  projectId: "REPLACE_HERE",
  storageBucket: "REPLACE_HERE",
  messagingSenderId: "REPLACE_HERE",
  appId: "REPLACE_HERE"
};

firebase.initializeApp(firebaseConfig);

export default firebase;