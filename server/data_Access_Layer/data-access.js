const express = require('express');
const mysql = require('mysql');
const config = require('../config');
const router = express.Router();

router.get('/', async (req, res, next) => {
    console.log('hello data access!!!')
    const connection = mysql.createConnection(config.db);

    await connection.query('select * from store', (err, rows, fields) => {
        if(err) throw err;
        res.json(rows);
    });
    connection.end();
});

router.get('/hello', (req, res) => {
    res.send("Hello World from routes! :)");
});

module.exports = router;