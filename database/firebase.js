import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};
const settings = {};

const config = {
  apiKey: "AIzaSyCk_spgouPPBGtxwRn-_-ecn8hd8Q4VbvA",
  authDomain: "ronda-app-a2495.firebaseapp.com",
  databaseURL: "https://ronda-app-a2495.firebaseio.com",
  projectId: "ronda-app-a2495",
  storageBucket: "ronda-app-a2495.appspot.com",
  messagingSenderId: "983340740393",
  appId: "1:983340740393:web:b4bf3a8b971df0d3205138"
  // ,
  // measurementId: "G-4X83JX0WZF"
};

rules_version = '2';
service cloud.firestore {
  match /databases/ronda-app-a2495/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2020, 8, 29);
    }
  }
}

if (!firebase.apps.length) {
    // firebase.initializeApp({});
    firebase.initializeApp(config);
}

firebase.firestore().settings(settings);

export default firebase;
