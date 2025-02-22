const error = require('../middleware/error');
const movie=require('../routes/moviesRoute');
const customer=require('../routes/customerRoute');
const rental=require('../routes/rentalRoute');
const user=require('../routes/userRoute');
const auth=require('../routes/authRoute');
const genre=require('../routes/genreRoute');
module.exports=function(app){
    app.use('/movies',movie);
    app.use('/customers',customer);
    app.use('/rentals',rental);
    app.use('/users',user);
    app.use('/auth',auth);
    app.use('/genres',genre);
    app.use(error)
  
}