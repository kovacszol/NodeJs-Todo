const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
    todoItem: String
});
module.exports = mongoose.model('todo', todoSchema);