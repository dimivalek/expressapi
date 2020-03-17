const express = require('express');
const router = require('./routes/routes.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:4200', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Origin',
        'x-access-token',
        'XSRF-TOKEN'
    ],
    preflightContinue: false
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
