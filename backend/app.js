require('dotenv').config();
// const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes')

const port = process.env.PORT;
const app = express();

app.use(express.static('../frontend/build'))
app.use(express.json());
app.use(cookieParser());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', routes)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(port, () => {
        console.log("Server started on port " + port);
    })
}).catch((err) => {
    console.log("DB connection error::", err);
})