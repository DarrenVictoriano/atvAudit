// Initialize dotenv
require('dotenv').config();

// Initialize Express
const express = require('express');
const app = express();

// Initialize Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes here
const routes = require('./Routes');
app.use(routes);

// ----------------------------- Removed MongoDB for now -------------------------------
// // Initialize MongoDB
// const mongoose = require('mongoose');
// let DB = process.env.MONGO_LOCAL_DB;

// // Connect to MongoDB
// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })
//     .then(() => {
//         console.log("MongoDB connected Successfully!");
//     })
//     .catch(err => {
//         console.log("MongoDB connection Error: " + err);
//     });
// ----------------------------- Removed MongoDB for now -------------------------------

// Start Server on PORT 5000
app.listen(5000, function () {
    console.log("Server is running on http://localhost:5000");
});
