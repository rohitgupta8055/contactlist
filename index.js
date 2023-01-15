//include express
const express = require("express");
//include port
const port = 8000;
// include path it is inbuid path
const path=require('path');

//database 
const db =require('./config/mongoose');

//though this contact we can make entries in databases
const Contact = require("./models/contactSch");

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
 
    Contact.find({},function(err,my_db_contacts){
        if(err){
            console.log("Error in fetching contacts from database");
            return;
        }
        return res.render('home',{title:'Contact List',contact_list:my_db_contacts});
       
    });

    // return res.render('home',{title:'Contact List',contact_list:contactList});
});

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
    
    // contactList.push({
    //     name:req.body.user_name,
    //     number:req.body.user_number
    // });

    //pushing to database
    Contact.create({
        name:req.body.user_name,
        phone:req.body.user_number
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return ;
        }
        console.log('*******',newContact);
        return res.redirect('back');
    });

   
//    return res.redirect('/');
   
})

//delete contact
app.get('/delete-contact',function(req,res){
    console.log(req.query);
    // let phone=req.query.number;

    // let contactIndex=contactList.findIndex(it=> it.number_ejs==phone);

    // if(contactIndex!=-1)
    // contactList.splice(contactIndex,1);

    // return res.redirect('back');

    let id=req.query.id;

    //find the contact in the databse using id and delete
   
    Contact.findByIdAndRemove(id,function(err){
        if(err){
            console.log('erro in deleting an object from databse');
            return ;
        }
        return res.redirect('back');
    });


});

//for listening on port if error display on console
app.listen( port , function(err){
    if(err){
        console.log( 'Error in running server ', err );
    }
    console.log( 'Server is up and Runing on port : ', port );
});