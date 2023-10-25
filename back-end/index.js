const express = require('express');
const cors = require('cors');
const connection = require('./connection');
const app = express();
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const billRoute = require('./routes/bill');
const dashboardRoute = require('./routes/dashboard');
const bp = require("body-parser");

app.use(bp.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// racine des routes
app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use('/bill', billRoute);
app.use('/dashboard',dashboardRoute);


module.exports = app;  