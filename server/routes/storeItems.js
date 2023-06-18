const express = require('express');
const mysql = require('mysql');
const config = require('../config');
const router = express.Router();
const {v4 : uuidv4} = require('uuid')

router.get('/', async (req, res, next) => {
    const connection = await mysql.createConnection(config.db);
    const q = 'select * from store';
    await connection.query(q, (err, rows, fields) => {
        if(err) throw err;
        res.json(rows);
    });
    connection.end();
});

router.get('/filter-search/:filter/:arg', async (req, res, next) => {
    const filter_query = await req.params.filter;
    const search_query = await req.params.arg;
    const connection = await mysql.createConnection(config.db);
    const q = `select * from store WHERE ${filter_query} LIKE "%${search_query}%"`;
    await connection.query(q, (err, rows, fields) => {
        if(err) throw err;
        res.json(rows);
    });
    connection.end();
});

router.get('/image-upload-key', async (req, res, next) => {
    res.json({key: config.imageUploadKey});
});

router.post('/add-item', async (req, res, next) => {
    const q = 
        `INSERT INTO store ` +
        `(id, title, quantity, location, customer_name, item_status, image_src) ` +
        `VALUES (` + 
        `'${uuidv4()}', ` +
        `'${req.body.title}', ` + 
        `'${req.body.quantity}', ` + 
        `'${req.body.location}', ` +
        `'${req.body.customer_name}', ` +
        `'${req.body.item_status}', ` + 
        `'${req.body.image_src}')`;
    const connection = await mysql.createConnection(config.db);
    await connection.query(q, async (err, data) => {
        if(err) throw err;
        await res.json(data);
    })
    connection.end();
});

router.get('/:id', async (req, res, next) => {
    const connection = await mysql.createConnection(config.db);
    const q = `SELECT * from store WHERE id = '${req.params.id} LIMIT 1'`;
    await connection.query(q, (err, row, fields) => {
        if(err) throw err;
        res.json(row);
    });
    connection.end();
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const q = `DELETE FROM store WHERE id = ${id}`;
    const connection = await mysql.createConnection(config.db);
    await connection.query(q, async (err, data) => {
        if(err) throw err;
        await res.json(`Item has being ${q}`);
    })
    connection.end();
})



router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const item = req.body;
    const q = "UPDATE store SET " + 
               `title = '${item.title}', ` + 
               `quantity = '${item.quantity}', ` + 
               `location = '${item.location}', ` +
               `customer_name = '${item.customer_name}', ` + 
               `item_status = '${item.item_status}', ` + 
               `image_src = '${item.image_src}' ` + 
               `WHERE id = '${id}'`;
    const connection = await mysql.createConnection(config.db);
    await connection.query(q, async (err, data) => {
        if(err) throw err;
        await res.json(`Item has being ${q}`);
    })
    connection.end();
})

router.get('/hello', (req, res) => {
    res.send("Hello World from Express backend routes! :)");
});

module.exports = router;