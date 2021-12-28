var express = require('express');
var router = express.Router();

var firebase = require('../connection/firebase_connection');
var firebaseDB_Admin = require("../connection/fireBase_admin_connection"); //27 create user data to real storage
var fireAuth = firebase.auth();

router.get('/', function (req, res) {
    res.render('signup', { title: '註冊',error: req.flash('error')});
})

router.post('/', function (req, res) {
    var email = req.body.email;
    var password = req.body.passwd;
    var nickName = req.body.nickname;
//註冊 vali 信箱格式、密碼六碼
    fireAuth.createUserWithEmailAndPassword(email, password) //內建功能 https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
            // create 成功後會回傳userCredential物件，而uid是放在userCredential物件裏
        .then(userCredential => {
            //send succ
            //console.log(user); // 瀏覽該用戶個資 
            //存取該用戶個資於 realStoradge
           const saveUser = {
            'email': email,
            'nickname': nickName,
            'uid': userCredential.user.uid
            }
            firebaseDB_Admin.ref('/user/'+userCredential.user.uid).set(saveUser);
            
            res.redirect('/signup/success');
        }).catch(function(error){
            //send false
            console.log(error);
            var errorMess = error.message;
            //改初始 error 字串
            if(errorMess === "The email address is badly formatted.")
                errorMess = "帳號格式不對"
            req.flash('error',errorMess); //line 9
            

            res.redirect('/signup');
        })
    
})
router.get('/success',function(req,res){
    res.render('success',{
        title:'註冊成功'
    });
})
module.exports = router;