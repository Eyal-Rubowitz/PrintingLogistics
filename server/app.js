const express = require('express');
const cors = require('cors');
const app = express();
const port = 9000;
const storeItems = require('./routes/storeItems');

app.use(express.json()); 

const corsOptions = {
  origin:'*', 
  credentials:true,            
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));

app.use("/database", storeItems);
app.use("/database/add-item", storeItems);

app.listen(port, () => {
    console.log(`Listening endpoint http://localhost:${port}`);
});
