const mongoose = require("mongoose")

const connectDB = async (req, res) => {
    try{
        
        const connString = process.env.MONGO_URI.replace("<password>", process.env.PASSWORD)
        const conn = await mongoose.connect(connString)
      
        console.log(`Connected to mongoDB: ${conn.connection.host}`)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;