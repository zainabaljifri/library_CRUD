const express = require('express');
const dotenv = require('dotenv').config()
const booksRouter = require('./routes/booksRoutes');
const usersRouter = require('./routes/usersRoutes');
const port = process.env.PORT
const connectDB = require('./db')

connectDB()
// create new app
const app = express();
app.use(express.json());

app.use('/books', booksRouter);
app.use('/users', usersRouter);

app.use('/', function(req, res) {
    res.send('node-api works :-)');
});

app.listen(port,  ()=> {
    console.log('Server is listening');
}
)
module.exports = app;