//make sure the env has been loaded
require('dotenv').config();

//require pg 
const pg = require('pg');

//use the pg client
const Client = pg.Client;

const client = new Client(process.env.DATABASE_URL);

//export the client

module.exports = client; 