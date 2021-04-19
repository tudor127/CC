const express = require('express');
const http = require('http');
const app = express();
const config = require('./config');
const router = require('./router');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client'));

router.set(app);

module.exports = app;