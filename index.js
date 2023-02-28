const express = require("express");
const updatedText = require("./public/scripts/script.js")
const mongoose = require("mongoose");
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
    });

//READ,SHOW
app.get('/', async (req, res) => {
    const allTodo = await todo.find({});
    res.render('index', { allTodo });
})
//CREATE
app.post('/create', async (req, res) => {
    const { createInput } = req.body;
    const newTodo = new todo({ todoItem: createInput })
    await newTodo.save();
    res.redirect('/');

})
//UPDATE
app.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    const updatedText = req.body.editInput;
    await todo.findByIdAndUpdate(id, { todoItem: updatedText });
    res.redirect("/");
});
//UPDATE
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await todo.findByIdAndDelete(id);
    res.redirect("/");
});

app.listen(3000, () => console.log("Server is running"));
