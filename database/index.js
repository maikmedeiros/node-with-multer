const mysql = require('mysql')

const conexao = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Mysql2022@',
    database: 'carometros'
})

module.exports = conexao