// Initialize dotenv
require('dotenv').config();

// Initialize Express
const express = require('express');
const app = express();

// Initialize Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes here
// const routes = require('./routes');
// app.use(routes);

// Initialize MongoDB
const mongoose = require('mongoose');
let DB = process.env.MONGO_LOCAL_DB;

// Connect to MongoDB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MongoDB connected Successfully!");
    })
    .catch(err => {
        console.log("MongoDB connection Error: " + err);
    });

// Start Server on PORT 5000
app.listen(5000, function () {
    console.log("Server is running on http://localhost:5000");
});
