import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root', // You can change the username here as per you config
    password: 'password', // You can change the password here as per you config
    database: 'tododb'
});


export default connection;