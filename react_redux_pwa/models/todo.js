const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var toDoSchema = new Schema({
    itemId: Number,
    item: String,
    completed: Boolean
}, { collection:"TodoList", timestamps: { createdAt: 'created_at', updatedAt:'updated_at' } });

// the schema is useless so far
// we need to create a model using it
var toDo = mongoose.model('ToDo', toDoSchema);

module.exports = toDo