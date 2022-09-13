const mongoose = require("mongoose")
const todoTaskSchema = new mongoose.Schema({   //we create a schema
    title: {
        type: String,
        required: true       //to make sure you are forced to enter the title
        //we can add max length if we want
    },
    content: {
        type: String,
        required: true       //to make sure you are forced to enter the title you can make false if you don't want to require it
    },
    date: {
        type: Date,
        default: Date.now //each type a new doc is create, there will be a default value of the date
    }
})

//We export our schema
module.exports = mongoose.model('TodoTask', todoTaskSchema, 'Tasks') //Added to the database and the specific collection named Tasks