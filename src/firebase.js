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
      this.db = firebase.firestore();
    }

    signIn = (email,password) => {
      return this.auth.signInWithEmailAndPassword(email,password);
    }

    signOut = () => {
        this.auth.signOut();
    }

    uploadData = (where, data) => {
        this.db.collection(where)
        .add({data})
        .then(function(docRef) {
            return {type:'success', msg: docRef.id};
        })
        .catch(function(error) {
            return {type:'error', msg: error};
        });
    }

    deleteEntry = (where,id) => {
        this.db.collection(where).doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    fetchData = (where) => {
        return this.db.collection(where).get()
        
        /*.then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        });*/
    }
  }

  const api = new Firebase();

  export default api;
