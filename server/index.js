const express = require("express")
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3001
const connectDB = require("./config/db")

connectDB();

app.use("/", require("./routes/person-routes"))

app.listen(port, () => {
    console.log("It's working!")
})
