//Declare variables
const express = require("express")
const app = express()
const PORT = 8500
const mongoose = require("mongoose")
const TodoTask = require("./models/todotask")
require("dotenv").config()
// const TodoTask = require("./models/todotask")
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

app.get('/', async (request, response) => {

    try {
        TodoTask.find({}, (err, tasks) => {
            res.render('index.ejs', { TodoTasks: tasks })
        })
    } catch (err) {
        if (err) return res.status(500).send(err)
    }
})

//fondamentals express methods
app.listen(PORT, () => console.log('Server is running on port ${PORT}'))

