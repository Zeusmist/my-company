const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoute = require('./routes/auth');
const pagesRoute = require('./routes/pages');
const adminPagesRoute = require('./routes/adminPages');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
})

app.use(express.json());

app.use('/api', authRoute);
app.use('/', pagesRoute);
app.use('/', adminPagesRoute);

const PORT = 5000;
app.listen(PORT, ()=> console.log(`Up and running on port : ${PORT}`))
