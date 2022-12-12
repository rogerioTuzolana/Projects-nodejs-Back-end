const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("../routes/user");

const app = express();

const port = process.env.port || 9000;

//Middleware
app.use(express.json());
app.use('/api', userRoutes);

//routes
app.get('/', (req, res)=>{
    res.send("Welcome to my API");
})

mongoose.connect(process.env.MONGODB_URI)
        .then(()=>console.log('Connected to MongoDB Atlas'))
        .catch((error)=> console.error('Error in Connection MongoDB Atlas'));

app.listen(port,()=>{
    console.log('Server listenig on port',port);
})