const winston = require("winston");
require('winston-mongodb');
require('express-async-errors');
module.exports = function () {
    winston.handelExceptions(
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
        new winston.transports.Console({colorize:true,prettyprint:true})    
        );
    process.on('unhandledRejection', (ex) => {
        throw ex
    })
    new winston.transports.File({ filename: 'logfile.log' });
    new winston.transports.MongoDB({ db: 'mongodb://localhost:27017/genre', level: 'info' });

    // process.on('uncaughtExceptions', (ex) => {
    //     console.log('WE GOT AN UNCAUGHT EXCEPTION !');
    //     winston.error(err.message, err)

    // })

}