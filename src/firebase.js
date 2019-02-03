import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var config = {
    apiKey: '',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: "findcats-14739",
    storageBucket: "",
    messagingSenderId: "811135046525"
  };

  class Firebase{
    constructor()
    {
      firebase.initializeApp(config);
      this.auth = firebase.auth();
    }

    signIn = (email,password) => {
      return this.auth.signInWithEmailAndPassword(email,password);
    }
  }

  const api = new Firebase();

  export default api;
