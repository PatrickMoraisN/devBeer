const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const loginRouter = require('../router/login');
const registrationRouter = require('../router/registration');
const productRouter = require('../router/product');
const saleRouter = require('../router/sale');
const imageRouter = require('../router/image');
const sellersRouter = require('../router/sellers');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRouter);
app.use('/registration', registrationRouter);
app.use('/products', productRouter);
app.use('/orders', saleRouter);
app.use('/images', imageRouter);
app.use('/sellers', sellersRouter);

module.exports = app;
