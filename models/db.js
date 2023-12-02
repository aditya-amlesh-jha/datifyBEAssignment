import dotenv from "dotenv";
import pg from 'pg';
const { Client} = pg;

dotenv.config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function createTableUserDetail(){
    const createUserDetailTableQuery = `
        CREATE TABLE IF NOT EXISTS userDetail(
            username VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
    `;
    await client.query(createUserDetailTableQuery);
}

async function connectToDb(){
    try{
        await client.connect();
        await createTableUserDetail();

        console.log(`\nConnected to db with Port ${process.env.DB_PORT}`);
    }
    catch(error){
        console.error("\nError connecting to PostgreSQL: ", error);
    }
}

async function disconnectFromDb(){
    try{
        await client.end();
        console.log("\nDB session ended");
    }
    catch(error){
        console.error("\nError disconnecting from PostgreSQL: ", error);
    }
}

export {client, connectToDb, disconnectFromDb};