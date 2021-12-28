var express = require('express');
var router = express.Router();

var firebaseDB = require('../connection/fireBase_admin_connection');  //驗證可行 line 11
var firebase = require('../connection/firebase_connection');

router.get('/', function (req, res, next) {
    //console.log(firebase.auth());   // 驗證connection/firebase_connection => 認證有模組化 可肆意使用
    // firebaseDB.ref('mail').set({test:"test"});

//撈取留言 顯示畫面
    firebaseDB.ref('list').once('value',function(snapshot){
        var listCommit = snapshot.val();

        var auth = req.session.uid; // catch login.js line 21 成功後存的session  => 控制 ejs 顯示 p

            /*firebaseDB.ref('mail').once('value',function(snapshot){
                console.log(snapshot.val());  // cmd 有顯示，表示 firebase db 有連上
            })*/

    //抓flash or session 字串 
        res.render('index', {
            title: '六角學院留言板',
            auth : auth,    // 尚未登入不能留言 session.uid
            errors : req.flash('errors'), // messageBoard.js 內 vali empty commit
            list : listCommit
        });
    })    
});
/* GET home page. */
module.exports = router;
