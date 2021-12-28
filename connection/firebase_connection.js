var firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyAWgeJkCBL-MaoBIi3-x7s6ktNiVw30tH8",
    authDomain: "fir-todolist-66127.firebaseapp.com",
    databaseURL: "https://fir-todolist-66127-default-rtdb.firebaseio.com",
    projectId: "fir-todolist-66127",
    storageBucket: "fir-todolist-66127.appspot.com",
    messagingSenderId: "863092102325",
    appId: "1:863092102325:web:98d118d86c33044afe5afc"
  };

  firebase.initializeApp(firebaseConfig);
  module.exports = firebase;

  //驗證可行 index.js line 8