const express = require('express');
const controller = require('./controllers/controller.js')

const app = express();

app.use(express.static('../ecommerce'));

controller(app);

app.listen(3000);
console.log('You are listening to port 3000');