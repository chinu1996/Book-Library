const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');



const app = express();


mongoose.connect('mongodb://das:test123@ds147946.mlab.com:47946/graph');
//it will connect the database to the app. Make sure you pass the user and the password.
mongoose.connection.once('open',() => {
    console.log('Connected to Database successfully')
    //once the database is connected successfully it will print the above line on the console
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true

}));

app.listen(4000, () =>{
    console.log("now listening to 4000")
});
