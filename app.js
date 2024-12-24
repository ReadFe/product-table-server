require('./config/mongoose');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')

const productRouter = require('./app/products/routes');
const logger = require('morgan');

app.use(cors())
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')) );
app.use('/api', productRouter);
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'failed',
        message: 'Resource ' + req.originalUrl + ' is Not Found'
    })
});
app.listen(3000, () => console.log('Server running at port 3000'));