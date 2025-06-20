const mysql = require('mysql2');

const pool = mysql.createPool({
    // host: 'localhost',
    socketPath: '/var/run/mysqld/mysqld.sock',
    user: 'root',
    password: 'root',
    database: 'DogWalkService'
});

module.exports = pool.promise();
