const express = require('express'); // Main framework for building the web server
const session = require('express-session'); // For handling login session
const path = require('path'); // Helps manage files and directory paths.
require('dotenv').config();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const categoryRoute = require('./routes/categoryRoute');

const app = express();

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Session Setup
app.use(session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use('/category', categoryRoute);

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`)
})
