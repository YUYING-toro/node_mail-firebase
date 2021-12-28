var express = require('express');
var router = express.Router();
var firebaseDB_Admin = require("../connection/fireBase_admin_connection"); 

router.post('/', function (req, res) {
    // vali content no null > 內建 chcekBody
    req.checkBody("content","內容不得為空").notEmpty();
    const errors = req.validationErrors();  // 20211227> 語法即將淘汰 return {error: { lication~, msg~, param~}}
    console.log("errors is "+ errors[0]); //errors is [object Object] //errors[0].msg > 內容不得為空
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    if(errors){
        req.flash('errors',errors[0].msg); //send to index.js get
        res.redirect('/');
    }else{
        //save comment to firebase > retrive nickname according to uid
        firebaseDB_Admin.ref('user/'+req.session.uid).once("value",function(snapshot){//登入 僅有 acc and pw no name so 透過 uid 找個資名字
            var nickname =snapshot.val().nickname; 

            var ref = firebaseDB_Admin.ref('list').push();
            var listContent = {
                nickname : nickname,
                content: req.body.content
            }
            ref.set(listContent)
                .then(function(){
                    res.redirect('/');
                })
        })
    }


    
})
module.exports = router;