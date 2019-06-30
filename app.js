var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR0KcvqiNaPyel7isOouRbP2m_7aw3r9s",
                authDomain: "angelhacks2019.firebaseapp.com",
                databaseURL: "https://angelhacks2019.firebaseio.com",
                projectId: "angelhacks2019",
                storageBucket: "",
                messagingSenderId: "479435914160",
                appId: "1:479435914160:web:9bbd10cf53dbb8ef"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var seed = "";

global.login = function(){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;  
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // ...
    });
    setTimeout(function() { loginStat(); }, 550);
    
}

global.loginStat = function(){
  if(firebase.auth().currentUser != null)
  {
    this.console.log("Welcome");
    document.getElementById("loginstat").innerHTML="Login Status: Successful ";
  }
}
global.test = function(){
     var userID = firebase.auth().currentUser;
    var ref = firebase.database().ref("Users/" + userID.uid);
    ref.once("value", function(snapshot){
      // Contains all data from Firebase
      var data = snapshot.val();
      // Has customer name
      var wordPhrase = data.Waves_Phrase;
      this.console.log(wordPhrase+ " ");
      seed=wordPhrase;
      });
    
    
    
  var rkey = document.getElementById("rkey").value;
    var amount = document.getElementById("amount").value/8;
    //var name = document.getElementById("name").value;
    //console.log(name + " " + email + " " + rkey + " " + amount);
    const { transfer } = require('@waves/waves-transactions')
    const signedTx = transfer({
    amount: amount*8,
      recipient: rkey,
    }, seed)
     const {broadcast} =  require('@waves/waves-transactions');
   const nodeUrl = 'https://testnodes.wavesnodes.com';
   
   broadcast(signedTx, nodeUrl).then(resp => console.log(resp))
    
  }
