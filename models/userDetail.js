import { client } from './db.js'
import bcrypt from 'bcrypt'

async function createUser(username,email,password){

    const createUserQuery = `
        INSERT INTO userDetail(username, email, password)
        VALUES($1,$2,$3)
        RETURNING *; 
    `;

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(createUserQuery,[username,email,hashedPassword]);
    return result.rows[0];
}

async function findUserByUsername(username){

    const findUserByUsernameQuery=`
        SELECT * from userdetail where username=$1;
    `;

    const result = await client.query(findUserByUsernameQuery,[username]);
    return result.rows[0];
}

async function findUserByEmail(email){

    const findUserByEmailQuery=`
        SELECT * from userdetail where email=$1;
    `;

    const result = await client.query(findUserByEmailQuery,[email]);
    return result.rows[0];
}

export {createUser,findUserByEmail,findUserByUsername};