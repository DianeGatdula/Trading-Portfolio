const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const CryptoRouter = require('./routes/crypto');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// mogodb connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection is established.");
});

app.use('/crypto', CryptoRouter);


app.listen(port, ()=> {
    console.log(`Server is running in port : ${port}`);
})