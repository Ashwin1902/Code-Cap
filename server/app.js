const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config()
// const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');
const eventRouter = require('./routes/eventRouter');


app.use(cors({
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
            return callback(null, true);
        }
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
    methods: ['GET', 'POST'],
    credentials: true, // Allow credentials (cookies)
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json())
app.use(cookieParser());
app.get('/', (req, res) => res.json({ message: 'API is running' }))
app.use(express.urlencoded({ extended: true }))
app.use('/api/user', userRouter)
app.use('/api/events', eventRouter)

module.exports = app