
var admin = require("firebase-admin");

var serviceAccount = require("../fir-todolist-66127-firebase-adminsdk-uabv6-2ea2b2d154.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-todolist-66127-default-rtdb.firebaseio.com"
});

// only use database
var db = admin.database();

//export to global for every router/ js 都可require 用到
module.exports = db;

//驗證可行 index.js line 4+ console.log(snapshot.val()); 