//include express
const express = require("express");
//include port
const port = 8000;
// include path it is inbuid path
const path=require('path');

//for using the functionbility of express convert into app
const app = express();

//making contactlist array

var contactList=[
    {
        name:"Rohit",
        number:'9354168293'
    },
    {
        name:'Maa',
        number:'9968615520'
    }
]

//tell the express that ejs is our view engine
app.set('view engine','ejs');
//we need to tell wher we are going to place views
app.set('views',path.join(__dirname,'views'));


//include assests folder through midlleware
app.use(express.static('assets'));

app.get( '/' , function( req , res ){
    return res.render('home',{title:'Contact List',contact_list:contactList});
})

app.get( '/profile' , function( req , res ){
    return res.render('profile',{title:'my page'});
})

app.get('/practice',function(req,res){
    return res.render('practice',{title:'practice page'});
});

//use express feature to encode data that is recieved from browser
app.use(express.urlencoded());

//for getting the form data to add contacts
app.post('/create-contact',function(req,res){
    console.log(req.body);
    console.log(req.body.user_name);
    console.log(req.body.user_number);
    
    contactList.push({
        name:req.body.user_name,
        number:req.body.user_number
    });

    return res.redirect('/');

   
})

//delete contact
app.get('/delete-contact',function(req,res){
    console.log(req.query);
    let phone=req.query.number;

    let contactIndex=contactList.findIndex(it=> it.number_ejs==phone);

    if(contactIndex!=-1)
    contactList.splice(contactIndex,1);

    return res.redirect('back');


})

//for listening on port if error display on console
app.listen( port , function(err){
    if(err){
        console.log( 'Error in running server ', err );
    }
    console.log( 'Server is up and Runing on port : ', port );
});