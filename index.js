const mongoose=require('mongoose');
const exp=require('express');
const app=exp()
const movie=require('./routes/moviesRoute')
const customer=require('./routes/customerRoute');
const rental=require('./routes/rentalRoute');
const Fawn = require('fawn');

mongoose.connect('mongodb://localhost:27017/genre').then(() => {
    console.log('Connection is success :)');
}).catch((err) => {
    console.log(`connection failed since ${err}`)
})
// Fawn.init(mongoose);

app.use(exp.json());
// app.use('/',home);
app.use('/movies',movie);
app.use('/customers',customer);
app.use('/rentals',rental);

const port=process.env.PORT || 4000
app.listen(port) 