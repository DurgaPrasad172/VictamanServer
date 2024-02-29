// server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 5005;

require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const connectDb =require("./utils/db");


// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

app.use(express.json());
app.use(cors());




// Routes
app.use('/auth',require('./routes/authRoutes'));
app.use('/api/admin',require('./routes/adminRoutes'));
app.use('/api/tracking', require('./routes/trackingRoutes'));



const PORT =5011;


connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port: ${PORT}`);
    });
});
