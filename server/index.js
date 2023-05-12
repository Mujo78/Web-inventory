const express = require("express")
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3001
const connectDB = require("./config/db")
const { errorHandler } = require("./middleware/error-handler")

connectDB();

app.use(express.json())

app.use("/", require("./routes/role-routes"))
app.use("/", require("./routes/person-routes"))
app.use("/", require("./routes/user-routes"))
app.use("/", require("./routes/supplier-routes"))
app.use("/", require("./routes/material-routes"))
app.use("/", require("./routes/product-routes"))
app.use("/", require("./routes/product-process-routes"))
app.use("/", require("./routes/product-process-item-routes"))

app.use(errorHandler)

app.listen(port, () => {
    console.log("It's working!")
})
