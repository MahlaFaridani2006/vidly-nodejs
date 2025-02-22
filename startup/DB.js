const mongoose = require('mongoose');
const winston = require('winston');

module.exports=function(){
    mongoose.connect('mongodb://localhost:27017/genre').then(() => {
            winston.info('Connection is success :)');
    });
    // .catch((err) => {
    //     console.log(`connection failed since ${err}`)
    // })
    
}