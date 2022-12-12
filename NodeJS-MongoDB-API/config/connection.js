const mongoose = require("mongoose")
require("dotenv").config();
class Connection{
    constructor(){
        this.dataBaseConnectionMongoDB();
    }

    dataBaseConnectionMongoDB(){
        this.mongoDBConnection = mongoose.connect(process.env.MONGODB_URI)
                                .then(()=>console.log('Connected to MongoDB Atlas'))
                                .catch((error)=> console.error('Error in Connection MongoDB Atlas'));
    }
}

module.exports = new Connection();