const client = require('../lib/client.js');

//importing seed data 

run ();

async function run() {
    try {
        //making the call
        await client.connect();

        await client.query(`
            INSERT INTO users (email, hash)
            VALUES ($1, $2);
        `,
        ['fakeemail@gmail.com', 'somepassword']
        );
    }
    catch (err){
        console.log(err);
    }
    finally {
        client.end();
    }
}