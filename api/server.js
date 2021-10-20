const express = require('express'); //importing a CommonJS module
const helmet = require('helmet');
const cors = require('cors');
const server = express(); //creates the server
require('dotenv').config(); //Lets us use environmental variables

// Global Middleware
server.use(express.json()); //middleware needed to parse JSON
server.use(helmet()); //middleware that adds a layer of security to the server
server.use(cors()); //middleware that allows cross domain communication from the browser

// Endpoints
server.get('/', (req, res) => {
  res.status(200).json({
    welcome: `to the danger zone!`,
    environment: process.env.NODE_ENV
  });
});

module.exports = server;