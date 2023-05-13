const express = require('express');
const cors = require('cors');
const app = express();
const port = 9000;
const storeItems = require('./routes/storeItems');

// const controller = require('./routes/store_controller');


app.use(express.json()); // allows to recive any json data from client.

const corsOptions = {
  origin:'*', 
  credentials:true,            
  optionSuccessStatus:200,
}

// The CORS Policy Enables Cross-origin resource sharing (CORS) in Express Gateway. 
// CORS defines a way in which a browser and server can interact 
// and determine whether it is (or not) safe to allow a cross-origin request.
app.use(cors(corsOptions));

app.use("/database", storeItems);
app.use("/database/add-item", storeItems);
// app.use("/database", controller);

app.listen(port, () => {
    console.log(`Listening endpoint http://localhost:${port}`);
});
