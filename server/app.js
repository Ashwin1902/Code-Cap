const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRouter = require('./routes/userRouter');
const eventRouter = require('./routes/eventRouter');

// Define allowed origins
const allowedOrigins = ['https://code-cap-azure.vercel.app', 'https://another-allowed-origin.com','http://localhost:5173']; // Add other origins as needed

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
    },
   // origin:'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Include methods as needed
    credentials: true, // Allow credentials (cookies)
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ message: 'API is running' }));
app.use('/api/user', userRouter);
app.use('/api/events', eventRouter);

module.exports = app;
