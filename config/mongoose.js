const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/test_dev_contact');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error in ocnnecting to db'));

db.once('open',function(){
    console.log('succesfully connected to database');
});