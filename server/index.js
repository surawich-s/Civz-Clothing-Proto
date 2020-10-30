const express = require('express');
const cors = require('cors');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

const product = require('./routes/api/products');
const order = require('./routes/api/orders')

app.use('/api/products', product);
app.use('/api/orders', order);

const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server started on port ${port}`));