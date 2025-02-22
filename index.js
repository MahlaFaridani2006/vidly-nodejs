const winston=require('winston')
const exp = require('express');
const app = exp();
require('./startup/logging');
require('./startup/routes')(app);
require('./startup/DB')();
require('./startup/config')();
require('./startup/validation');

// const Fawn = require('fawn');
// Fawn.init(mongoose);

app.use(exp.json());

const port = process.env.PORT || 4000
app.listen(port,()=>winston.info(`listen on port ${port}`)) 