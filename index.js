const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const nocache = require('nocache')

const authRoute = require('./routes/auth');
const pagesRoute = require('./routes/pages');
const adminPagesRoute = require('./routes/adminPages');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(nocache())
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
})

app.use(express.json());

app.use('/api', authRoute);
app.use('/', pagesRoute);
app.use('/', adminPagesRoute);

if(process.env.NODE_ENV === "production"){
    // app.use(express.static('static/build'));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    // })
    const root = path.join(__dirname, 'client', 'build')
    app.use(express.static(root));
    app.get("*", (req, res) => {
        res.sendFile('index.html', { root });
    })
}
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Up and running on port : ${PORT}`))
