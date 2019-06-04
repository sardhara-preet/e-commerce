const express = require('express');
const controller = require('./controllers/controller.js')
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('../ecommerce'));

controller(app);

app.listen(PORT);
console.log('You are listening to port 3000');