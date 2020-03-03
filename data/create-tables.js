const client = require('../lib/client.js');

run ();

async function run() {

    try {
        await client.connect();
        await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(256) NOT NULL,
            hash VARCHAR(512) NOT NULL
        );
    `); 
        console.log('create tables complete');
    }
    catch (err) {
        console.log(err);
    } 
    finally {
        client.end();
    }
}