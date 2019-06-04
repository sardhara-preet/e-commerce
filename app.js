const express = require('express');
const controller = require('./public/controllers/controller.js')
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('./public'));

controller(app);

app.listen(PORT);
console.log('You are listening to port 3000');