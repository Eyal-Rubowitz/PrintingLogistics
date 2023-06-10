//1. Parsing & validating the payload of incomeing request sent by the client 
//   in order to strip htem away from HTTP-specific properties.
//2. Forwarding the parsed data to the Service Layer for handling
//   the buisness logic of the app.
//3. Translation the result of the call made to the Service Layer
//   into a valid HTTP response before sending it back to the client.

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

router.get('/image-upload-key', async (req, res, next) => {
    res.json({key: config.imageUploadKey});
});

router.post('/add-item', async (req, res, next) => {
    console.log("Add new item in progress");
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
    console.log("fetch query: ", q);
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
    console.log('qqqqqqqqqqq: ', q)
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