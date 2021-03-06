import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var config = {
    apiKey: '',
    authDomain: 'findcats-14739.firebaseapp.com',
    databaseURL: "https://findcats-14739.firebaseio.com",
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

    uploadData = async (col, data) => {
        try {
            let docRef = await this.db.collection(col).add(data);
            return {type:'success', msg: 'doc ' + docRef.id + ' written!'};

        }
        catch(err){
            return {type:'fail', msg: err};
        }
    }

    deleteEntry = (col,id) => {
        this.db.collection(col).doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    fetchDataQuery = async (col, query) => {
        return this.db.collection(col).where("searchTerms","array-contains",query).get();
    }

    fetchAllFromCol = async (col) =>{
        return this.db.collection(col).get();
    } 

    fetchDataMap = async (col,map) => {
        return this.db.collection(col).where("regionCode", "==", map).get();
    }
  }

  const api = new Firebase();

  export default api;
