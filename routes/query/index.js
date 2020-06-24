const mysql = require('mysql');
const Promise = require('bluebird');
const config = require('../../config.json')

var connection = mysql.createPool({
    connectionLimit: 1,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

exports.executeSQL = (sql, replacements) =>{
    return new Promise((resolve, reject) => {
        connection.query(sql, replacements, (err, rows, fields) => {
            if(err){
                return reject(err);
            }
            resolve(rows);
        })
    })
}