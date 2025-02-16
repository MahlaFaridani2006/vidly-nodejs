const error=require('./middleware/error')
const joi=require('joi');
joi.objectId=require('joi-objectid')(joi)
const mongoose=require('mongoose');
const exp=require('express');
const app=exp()
const movie=require('./routes/moviesRoute')
const customer=require('./routes/customerRoute');
const rental=require('./routes/rentalRoute');
const user=require('./routes/userRoute');
const auth=require('./routes/authRoute');
const genre=require('./routes/genreRoute')
const Fawn = require('fawn');
const config=require('config');
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR:jwtPrivateKey not found');
    process.exit(1);
}
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
app.use('/users',user);
app.use('/auth',auth);
app.use('/genres',genre);
app.use(error)
const port=process.env.PORT || 4000
app.listen(port) 