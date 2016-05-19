//import the required modules for the Web App to run
var express  = require('express');
var fs = require('fs');
var formidable = require("formidable");
var bodyParser = require("body-parser");
var multer  = require('multer');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {

    //======================
    //RENDER THE LOGIN PAGE
    //======================
    app.get('/login', function (req, res) {
       res.render('login.html');
    })
    
    //===============================
    //RENDER THE CONFIGURATION PAGE
    //===============================
    app.get('/configuration', function (req, res) {
       res.render('configuration.html',{ name: "example" });
    })
    
    //===============================
    //RENDER THE UPLOAD PAGE
    //===============================
    app.get('/upload', function (req, res) {
       res.render('upload.html');
    })
    
    //==========================================
    //MANAGE THE POST ACTION FOR THE LOGIN PAGE
    //==========================================
    app.post('/loginPost', urlencodedParser, function (req, res) {
        
        // Asynchronous read from config.json file
        var obj = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));
        
        // Prepare output in JSON format
       response = {
           username:req.body.username,
           password:req.body.password
       };
        
        if(obj.authentication.username == response.username && obj.authentication.password == response.password){
            res.redirect('/configuration');
        }
        else{
            console.log("username or password wrong!!!");
            res.redirect('/login');
        }
       console.log(response);
       res.end(JSON.stringify(response));
    })

    //==========================================
    //MANAGE THE POST ACTION FOR THE UPLOAD PAGE
    //==========================================
    /*app.post('/fileUpload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});*/
}