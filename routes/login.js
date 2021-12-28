var express = require('express');
var router = express.Router();
var firebase = require('../connection/firebase_connection');
var firebaseDB_Admin = require("../connection/fireBase_admin_connection"); //27 create user data to real storage
var fireAuth = firebase.auth();

router.get('/', function (req, res,next) {
        res.render('login', { 
        title: '登入', 
        error: req.flash('error'),

    });
})
router.post('/', function (req, res) {
    var email = req.body.email;
    var password = req.body.passwd;
    fireAuth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log('成功'+userCredential.user.uid)  //user.id is undefined
            //recod succ uid
            req.session.uid = userCredential.user.uid;  // to index.js
            res.redirect('/')

        }).catch(function(error){
            console.log(error)
            var errorMess = error.message;
            req.flash('error',errorMess); //line 9
            res.redirect('/login')

        })

})
module.exports = router;