const mongoose = require("mongoose")

const connectDB = async (req, res) => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`Connected to mongoDB: ${conn.connection.host}`)
    }catch(error){
        process.exit(1)
    }
}

module.exports = connectDB;