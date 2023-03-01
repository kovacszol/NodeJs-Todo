const express = require("express");
const mongoose = require("mongoose");
const sanitizeHtml = require('sanitize-html');
const engine = require("ejs-mate");
const todo = require("./models/todo");
const app = express();
var path = require('path')
const methodOverride = require('method-override');
app.engine('ejs', engine);
app.set('views', __dirname + '/pages')
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// Use method-override middleware
app.use(methodOverride('_method'));


//CONNECTIN TO DATABASE
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/todo',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(`Connection error: ${err}`));

//READ,SHOW
app.get('/', async (req, res) => {
    const allTodo = await todo.find({});
    res.render('index', { allTodo });
})
//CREATE
app.post('/create', async (req, res) => {
    let { createInput } = req.body;
    createInput = sanitizeHtml(createInput, {
        allowedTags: [],
        allowedAttributes: {},
    });
    if (createInput.trim().length < 3) {
        return res.status(400).json({ error: "Input must have at least 3 characters, and can not contain tags" });
    }
    try {
        const newTodo = new todo({ todoItem: createInput });
        await newTodo.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create new todo item' });
    }
});

//UPDATE
app.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    const updatedText = req.body.editInput;
    try {
        const updatedTodo = await todo.findByIdAndUpdate(id, { todoItem: updatedText }, { new: true });
        if (!updatedTodo) throw new Error(`Todo with ID ${id} not found`);
        res.redirect("/");
    } catch (err) {
        res.status(400).send(`Error updating todo: ${err.message}`);
    }
});
//DELETE
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTodo = await todo.findByIdAndDelete(id);
        if (!deletedTodo) throw new Error(`Todo with ID ${id} not found`);
        res.redirect("/");
    } catch (err) {
        res.status(400).send(`Error deleting todo: ${err.message}`);
    }
});

app.listen(3000, () => console.log("Server is running"));
