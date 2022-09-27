//Declare variables
const express = require("express");
const app = express();
const PORT = 8500;
const mongoose = require("mongoose");
const TodoTask = require("./models/todotask");
require("dotenv").config();
// const TodoTask = require("./models/todotask")
// Add model variable

//middleware help interpret things for us and tell the server what to use
//want to use my server.js to render ejs
app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // extended allows us to pass complex things such as arrays

//connect to mongodb via mongoose
mongoose.connect(process.env.DB_CONNECTION,  //go and take the dbconnection string in the .env file
    { useNewUrlParser: true },
    () => { console.log("Connected to db!") }
)


//Get method
app.get('/', async (request, response) => {

    try {
        TodoTask.find({}, (err, tasks) => {
            response.render("index.ejs", { todoTasks: tasks }); //Pass our full list of tasks into our ejs. Here todoTask is a key and tasks will be an array
        });

    } catch (err) {
        if (err) return response.status(500).send(err);
    }
});

//POST METHOD
app.post('/', async (request, response) => {
    const todoTask = new TodoTask(
        {
            title: request.body.title,
            content: request.body.content
        }
    )

    try {
        await todoTask.save()//wait for the document to be created before saving it
        console.log(todoTask)
        response.redirect("/") //like the refresh you're redirected to the main page
    } catch (err) {
        if (err) return response.status(500).send(err)
        response.redirect('/')
    }
})


//UPDATE METHOD
// app
//     .route("/edit/:id") //Extract the id
//     .get((req, res) => {
//         const id = req.params.id;
//         TodoTask.find({}, (err, tasks) => {
//             res.render('edit.ejs', {
//                 todoTasks: tasks, idTask: id
//             })
//         })
//     })
//     .post((req, res) => { //We use post here because form doesn't support the put request
//         const id = req.params.id;
//         TodoTask.findByIdAndUpdate(
//             id,
//             {
//                 title: req.body.title,
//                 content: req.body.content
//             },
//             err => {
//                 if (err) return res.status(500).send(err)
//                 res.redirect('/')
//             }
//         )
//     })

app
    .route("/edit/:id")
    .get((request, response) => {
        const id = request.params.id;
        TodoTask.find({}, (err, tasks) => {
            response.render("edit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    .post((request, response) => {
        const id = request.params.id;
        TodoTask.findByIdAndUpdate(
            id,
            {
                title: request.body.title,
                content: request.body.content
            },

            err => {
                if (err) return response.status(500).send(err);
                response.redirect("/");
            });
    });


//DELETE METHOD
app
    .route("/remove/:id")
    .get((request, response) => {
        const id = request.params.id;
        TodoTask.findByIdAndRemove(id, err => {
            if (err) return response.status(500).send(err)
            response.redirect('/')

        })
    })

//fondamentals express methods
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

