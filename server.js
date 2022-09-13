//Declare variables
const express = require("express")
const app = express()
const PORT = 8500
const mongoose = require("mongoose")
require("dotenv").config()
// Add model variable

//middleware help interpret things for us and tell the server what to use
//want to use my server.js to render ejs
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // extended allows us to pass complex things such as arrays

//connect to mongodb via mongoose
mongoose.connect(process.env.DB_CONNECTION,  //go and take the dbconnection string in the .env file
    { useNewUrlParser: true },
    () => { console.log("Connected to db!") }
)

//fdtals express methods
app.listen(PORT, () => console.log('Server is running on port ${PORT}'))

